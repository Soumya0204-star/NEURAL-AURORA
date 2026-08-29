const API_BASE = (import.meta.env.VITE_AI_API_BASE || 'https://api.openai.com/v1').replace(/\/+$/, '')
const API_KEY = import.meta.env.VITE_AI_API_KEY
const MODEL = import.meta.env.VITE_AI_MODEL || 'gpt-4o-mini'

export async function callAi(messages, tools, opts) {
  if (!API_KEY) {
    throw new Error(
      'VITE_AI_API_KEY environment variable is not set. ' +
      'To use the AI Portfolio Assistant, set this variable in your .env file.'
    )
  }

  const body = {
    model: opts?.model || MODEL,
    messages,
    temperature: opts?.temperature ?? 0.1,
    max_tokens: opts?.max_tokens ?? 1024,
  }

  if (tools && tools.length > 0) {
    body.tools = tools
    body.tool_choice = 'auto'
  }

  const res = await fetch(`${API_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error(`[AI Provider] ${res.status} from ${res.url}:`, err)
    throw new Error(`AI API error (${res.status}): ${err}`)
  }

  return res.json()
}

export async function diagnoseAi() {
  try {
    const res = await fetch(`${API_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL || 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'Say hello' }],
        max_tokens: 10,
      }),
    })
    const info = {
      baseUrl: API_BASE,
      model: MODEL,
      keySet: !!API_KEY,
      keyPrefix: API_KEY ? API_KEY.slice(0, 8) + '...' : '(none)',
      status: res.status,
      ok: res.ok,
    }
    if (!res.ok) {
      const text = await res.text()
      info.error = text.slice(0, 500)
      console.error('[AI Diagnose] Failed:', info)
    } else {
      console.log('[AI Diagnose] OK:', info)
    }
    return info
  } catch (err) {
    const info = {
      baseUrl: API_BASE,
      model: MODEL,
      keySet: !!API_KEY,
      keyPrefix: API_KEY ? API_KEY.slice(0, 8) + '...' : '(none)',
      ok: false,
      error: err.message,
    }
    console.error('[AI Diagnose] Network error:', info)
    return info
  }
}
