import { createContext, useContext, useEffect, useState } from 'react';

const TOKEN_KEY = 'docappoint_token';
const API = import.meta.env.VITE_API_URL;

export const AuthContext = createContext(null);

async function fetchMe(token) {
  const res = await fetch(`${API}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Session expired');
  return res.json();
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load: check localStorage for token and restore user
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setLoading(false);
      return;
    }
    fetchMe(token)
      .then((userData) => setUser(userData))
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false));
  }, []);

  // POST /api/auth/register
  const register = async (name, email, password, photo) => {
    const res = await fetch(`${API}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, photo }),
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
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Login failed');
    }
    const data = await res.json();
    localStorage.setItem(TOKEN_KEY, data.token);
    setUser(data.user);
    return data.user;
  };

  // Called after token is saved externally — fetches /api/auth/me and updates state
  const getUser = async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    try {
      const userData = await fetchMe(token);
      setUser(userData);
      return userData;
    } catch {
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
      return null;
    }
  };

  // Clear token and user state
  const logout = () => {
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
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
