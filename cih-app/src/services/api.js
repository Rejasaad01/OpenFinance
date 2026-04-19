const DEFAULT_API_BASE_URL = 'https://backend-production-df87.up.railway.app'

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL
).replace(/\/$/, '')

const parseErrorMessage = async (response) => {
  try {
    const payload = await response.json()
    if (Array.isArray(payload.detail)) {
      return payload.detail.map((item) => item.msg).join(', ')
    }
    return payload.detail || payload.message || response.statusText
  } catch {
    return response.statusText
  }
}

export const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const message = await parseErrorMessage(response)
    throw new Error(message || `Request failed with status ${response.status}`)
  }

  if (response.status === 204) return null
  return response.json()
}
