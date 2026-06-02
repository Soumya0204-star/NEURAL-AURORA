const DOCS_URL_KEY = 'neural-docs-url'

export function getDocsUrl() {
  try {
    return localStorage.getItem(DOCS_URL_KEY) || ''
  } catch {
    return ''
  }
}

export function setDocsUrl(url) {
  try {
    localStorage.setItem(DOCS_URL_KEY, url)
  } catch {}
}
