import { useState, useEffect } from 'react'
import { getAdminSettings, updateAdminSettings } from '../../lib/supabase'
import { getDocsUrl, setDocsUrl as saveDocsUrl } from '../../lib/docs-config'

export default function AdminDocsConfig() {
  const [docsUrl, setDocsUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    setLoading(true)
    const local = getDocsUrl()
    if (local) setDocsUrl(local)
    try {
      const settings = await getAdminSettings()
      if (settings?.docs_url) {
        setDocsUrl(settings.docs_url)
        saveDocsUrl(settings.docs_url)
      }
    } catch {
      // settings table may not have docs_url yet
    }
    setLoading(false)
  }

  async function handleSave() {
    setSaving(true)
    setMessage(null)
    const trimmed = docsUrl.trim()
    saveDocsUrl(trimmed)
    try {
      await updateAdminSettings({ docs_url: trimmed })
      setMessage({ type: 'success', text: 'Documentation URL saved successfully.' })
    } catch (err) {
      setMessage({ type: 'error', text: `Saved locally (Supabase: ${err.message || err})` })
    }
    setSaving(false)
  }

  const sectionStyle = {
    borderColor: 'var(--border-color)',
    background: 'var(--card-bg)',
  }

  const inputStyle = {
    borderColor: 'var(--border-color)',
    background: 'var(--input-bg)',
    color: 'var(--text-primary)',
  }

  if (loading) {
    return <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Loading...</p>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Documentation Configuration
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Set the link to your documentation website shown on the verification screen
        </p>
      </div>

      <div className="max-w-xl rounded-xl border p-4 md:p-6 space-y-4" style={sectionStyle}>
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
            Documentation URL
          </label>
          <input
            type="url"
            value={docsUrl}
            onChange={(e) => setDocsUrl(e.target.value)}
            placeholder="https://docs.example.com"
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-cyan-500/50"
            style={inputStyle}
          />
          <p className="mt-1 text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
            This URL will open when users click "Get Started" on the verification screen and in the navbar.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg px-5 py-2 text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: 'var(--accent)' }}
          >
            {saving ? 'Saving...' : 'Save URL'}
          </button>

          {docsUrl.trim() && (
            <a
              href={docsUrl.trim()}
              target="_self"
              rel="noopener noreferrer"
              className="rounded-lg px-5 py-2 text-sm font-medium transition-all"
              style={{ color: 'var(--text-secondary)', background: 'var(--hover-bg)' }}
            >
              Test Link
            </a>
          )}
        </div>

        {message && (
          <p className="text-sm" style={{ color: message.type === 'success' ? '#10b981' : message.type === 'error' ? '#ef4444' : '#f59e0b' }}>
            {message.text}
          </p>
        )}
      </div>
    </div>
  )
}
