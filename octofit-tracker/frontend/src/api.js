// Requires VITE_CODESPACE_NAME to be defined (e.g. in .env.local) when running in a Codespace.
// Falls back to localhost when VITE_CODESPACE_NAME is unset, avoiding "https://undefined-8000..." URLs.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export async function fetchApi(resource) {
  const response = await fetch(`${API_BASE_URL}/api/${resource}/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${resource}: ${response.status}`);
  }
  const data = await response.json();
  // Support both plain array responses and paginated responses ({ results: [...] }).
  return Array.isArray(data) ? data : (data.results ?? []);
}
