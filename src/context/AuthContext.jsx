import { createContext, useContext, useEffect, useState } from 'react';
import { authClient } from '../lib/authClient';

export const AuthContext = createContext(null);

const AUTH_KEY = 'docappoint_user';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      // 1. Check localStorage (email/password JWT flow)
      try {
        const stored = localStorage.getItem(AUTH_KEY);
        if (stored) {
          setUser(JSON.parse(stored));
          setLoading(false);
          return;
        }
      } catch {
        localStorage.removeItem(AUTH_KEY);
      }

      // 2. Check Better Auth session (Google OAuth flow — set after OAuth callback)
      try {
        const { data } = await authClient.getSession();
        if (data?.user) {
          const userData = {
            name: data.user.name,
            email: data.user.email,
            photoURL: data.user.image ?? null,
            _id: data.user.id,
          };
          setUser(userData);
          localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
        }
      } catch {
        // no Better Auth session present
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const login = async (email, password) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Login failed');
    }
    const data = await res.json();
    const userData = { ...data.user, token: data.token };
    setUser(userData);
    localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
    return userData;
  };

  const register = async ({ name, email, photoURL, password }) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, photoURL, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Registration failed');
    }
    return res.json();
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
    // Clear Better Auth session cookie if one exists (Google OAuth users)
    try {
      await authClient.signOut();
    } catch {
      // ignore — may not have a Better Auth session
    }
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
