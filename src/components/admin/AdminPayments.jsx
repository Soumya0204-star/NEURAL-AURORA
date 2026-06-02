import { useState, useEffect } from 'react'
import { getPayments } from '../../lib/supabase'

export default function AdminPayments() {
  const [payments, setPayments] = useState([])

  useEffect(() => { load() }, [])

  async function load() {
    try { setPayments(await getPayments()) } catch {}
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Payments
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Payment records from service purchases
        </p>
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
        {payments.length === 0 ? (
          <p className="py-8 text-center text-sm" style={{ color: 'var(--text-tertiary)' }}>
            No payments yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'var(--input-bg)' }}>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider font-medium" style={{ color: 'var(--text-tertiary)' }}>Source</th>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider font-medium" style={{ color: 'var(--text-tertiary)' }}>Option</th>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider font-medium" style={{ color: 'var(--text-tertiary)' }}>Amount</th>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider font-medium" style={{ color: 'var(--text-tertiary)' }}>Payment ID</th>
                  <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider font-medium" style={{ color: 'var(--text-tertiary)' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-t" style={{ borderColor: 'var(--border-color)' }}>
                    <td className="px-4 py-3">
                      {p.service_id === 'support' ? (
                        <span className="rounded px-1.5 py-0.5 text-[10px]" style={{ background: 'rgba(244,63,94,0.08)', color: 'rgba(244,63,94,0.8)' }}>
                          Support
                        </span>
                      ) : (
                        <span className="rounded px-1.5 py-0.5 text-[10px]" style={{ background: 'rgba(6,182,212,0.08)', color: 'rgba(6,182,212,0.8)' }}>
                          Service
                        </span>
                      )}
                      <span className="block text-[11px] font-medium mt-1" style={{ color: 'var(--text-primary)' }}>
                        {p.service_title}
                      </span>
                      {p.customer_name && (
                        <span className="block text-[10px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{p.customer_name}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {p.pricing_label}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--text-primary)' }}>
                      {p.currency}{p.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                        {p.razorpay_payment_id || '-'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                      {new Date(p.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
