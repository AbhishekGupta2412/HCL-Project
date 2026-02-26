/**
 * Auth API client for SmartBite.
 * Configure VITE_AUTH_API_URL in .env (e.g. http://localhost:8080)
 * or leave unset to use /api (Vite proxy to backend).
 */
const AUTH_BASE = import.meta.env.VITE_AUTH_API_URL || '/api';

function getAuthHeaders() {
  const token = localStorage.getItem('smartbite_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export async function login(email, password) {
  const res = await fetch(`${AUTH_BASE}/auth/login`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error || 'Login failed');
  }
  return data;
}

export async function signup(name, email, password) {
  const res = await fetch(`${AUTH_BASE}/auth/register`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error || 'Signup failed');
  }
  return data;
}

export function getStoredToken() {
  return localStorage.getItem('smartbite_token');
}

export function setStoredToken(token) {
  if (token) localStorage.setItem('smartbite_token', token);
  else localStorage.removeItem('smartbite_token');
}
