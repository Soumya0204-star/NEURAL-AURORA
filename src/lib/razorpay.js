function loadScript() {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-checkout-script')) {
      console.log('[Razorpay] Script already loaded')
      resolve(true)
      return
    }
    const script = document.createElement('script')
    script.id = 'razorpay-checkout-script'
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => {
      console.log('[Razorpay] Script loaded successfully')
      resolve(true)
    }
    script.onerror = () => {
      console.error('[Razorpay] Script failed to load')
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

function formatAmount(amount) {
  return Math.round(amount * 100)
}

export async function openRazorpayCheckout({
  amount,
  currency = 'INR',
  description = 'Support NEURAL AURORA',
  prefill = {},
  method,
  key,
  onSuccess,
  onError,
}) {
  let razorpayKey = (key || '').trim()
  if (!razorpayKey || razorpayKey.includes('xxxxxxxx')) {
    razorpayKey = (import.meta.env.VITE_RAZORPAY_KEY_ID || '').trim()
  }
  console.log('[Razorpay] Key:', razorpayKey ? razorpayKey.slice(0, 12) + '...' : 'EMPTY')

  if (!razorpayKey || razorpayKey.includes('xxxxxxxx')) {
    const msg = 'Razorpay key is not configured. Set it in Settings → Payment Settings'
    console.error('[Razorpay]', msg)
    onError?.(new Error(msg))
    return
  }

  const loaded = await loadScript()
  if (!loaded) {
    const msg = 'Failed to load Razorpay checkout script. Check your internet or ad blocker.'
    console.error('[Razorpay]', msg)
    onError?.(new Error(msg))
    return
  }

  try {
    let orderId = null
    try {
      console.log('[Razorpay] Creating order...')
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: formatAmount(amount), currency }),
      })
      if (res.ok) {
        const order = await res.json()
        orderId = order.id
        console.log('[Razorpay] Order created:', orderId)
      }
    } catch (_) {
      console.log('[Razorpay] Order creation skipped (dev mode or serverless offline)')
    }

    const safePrefill = prefill || {}
    const prefillFields = {}
    if (safePrefill.name) prefillFields.name = safePrefill.name
    if (safePrefill.email) prefillFields.email = safePrefill.email
    if (safePrefill.contact) prefillFields.contact = safePrefill.contact

    const options = {
      key: razorpayKey,
      amount: formatAmount(amount),
      currency,
      name: 'NEURAL AURORA',
      description: description || `Support NEURAL AURORA — ₹${amount}`,
      ...(orderId ? { order_id: orderId } : {}),
      ...(method ? { method } : {}),
      ...(Object.keys(prefillFields).length > 0 ? { prefill: prefillFields } : {}),
      handler(response) {
        console.log('[Razorpay] Payment success:', response)
        onSuccess?.(response)
      },
      modal: {
        ondismiss() {
          console.log('[Razorpay] Payment cancelled by user')
          onError?.(new Error('Payment cancelled'))
        },
      },
    }

    console.log('[Razorpay] Opening checkout...', { amount: options.amount, key: options.key?.slice(0, 12) })
    const rzp = new window.Razorpay(options)
    rzp.open()
  } catch (err) {
    console.error('[Razorpay] Error:', err)
    onError?.(err)
  }
}
