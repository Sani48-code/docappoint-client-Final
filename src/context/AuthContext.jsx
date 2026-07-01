import { createContext, useContext, useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL;

export const AuthContext = createContext(null);

// The JWT lives in an httpOnly cookie, so it's never touched from JS —
// `credentials: 'include'` sends/receives it automatically on every call.
async function fetchMe() {
  const res = await fetch(`${API}/api/auth/me`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Session expired');
  return res.json();
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load: ask the backend who we are — the cookie (if any) rides along
  useEffect(() => {
    fetchMe()
      .then((userData) => setUser(userData))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // POST /api/auth/register
  const register = async (name, email, password, role, photoURL) => {
    const res = await fetch(`${API}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, email, password, role, photoURL }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Registration failed');
    }
    return res.json();
  };

  // POST /api/auth/login
  const login = async (email, password) => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Login failed');
    }
    const data = await res.json();
    setUser(data.user);
    return data.user;
  };

  // Called after a cookie-issuing call (e.g. Google login) — re-fetches /api/auth/me
  const getUser = async () => {
    try {
      const userData = await fetchMe();
      setUser(userData);
      return userData;
    } catch {
      setUser(null);
      return null;
    }
  };

  // Cookie is httpOnly, so JS can't clear it — ask the backend to clear it instead
  const logout = async () => {
    setUser(null);
    try {
      await fetch(`${API}/api/auth/logout`, { method: 'POST', credentials: 'include' });
    } catch {
      // Best-effort: local state is already cleared above
    }
  };

  const updateUser = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, getUser, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
