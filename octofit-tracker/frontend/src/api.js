function getApiBaseUrl() {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  if (import.meta.env.VITE_CODESPACE_NAME) {
    return `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`;
  }
  if (typeof window !== 'undefined' && window.location.hostname.includes('.app.github.dev')) {
    return `https://${window.location.hostname.replace(/-\d+(\.app\.github\.dev)/, '-8000$1')}`;
  }
  return 'http://localhost:8000';
}

export const API_BASE_URL = getApiBaseUrl();

export async function fetchApi(resource) {
  const normalizedResource = resource.replace(/^\/+|\/+$/g, '');
  const response = await fetch(`${API_BASE_URL}/api/${normalizedResource}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${resource}: ${response.status}`);
  }
  const data = await response.json();
  // Support both plain array responses and paginated responses ({ results: [...] }).
  return Array.isArray(data) ? data : (data.results ?? []);
}
