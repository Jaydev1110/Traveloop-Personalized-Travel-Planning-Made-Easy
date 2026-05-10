import { createContext, useContext, useMemo, useState, useEffect, useCallback } from 'react';
import api from '../api/axios.js';

const AuthContext = createContext(null);

const ADMIN_SHELL_KEY = 'traveloop-admin-shell';

function readStoredUser() {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function readAdminShell() {
  try {
    return localStorage.getItem(ADMIN_SHELL_KEY) === 'traveler' ? 'traveler' : 'console';
  } catch {
    return 'console';
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [adminShell, setAdminShellState] = useState(readAdminShell);
  const [loading, setLoading] = useState(true);

  const setAdminShell = useCallback((shell) => {
    const next = shell === 'traveler' ? 'traveler' : 'console';
    try {
      localStorage.setItem(ADMIN_SHELL_KEY, next);
    } catch {
      /* ignore */
    }
    setAdminShellState(next);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    try {
      localStorage.removeItem(ADMIN_SHELL_KEY);
    } catch {
      /* ignore */
    }
    setAdminShellState('console');
    setUser(null);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get('/auth/me');
        if (!cancelled) {
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
          if (data.user.role !== 'admin') {
            setAdminShellState('console');
          } else {
            setAdminShellState(readAdminShell());
          }
        }
      } catch {
        if (!cancelled) logout();
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [logout]);

  /**
   * @param {object} nextUser
   * @param {{ adminEntry?: 'console' | 'traveler' }} [options] — for admins: which UI to open after login (JWT still controls role)
   */
  const loginWithToken = useCallback((token, nextUser, options = {}) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(nextUser));
    setUser(nextUser);
    if (nextUser.role === 'admin') {
      const entry = options.adminEntry === 'traveler' ? 'traveler' : 'console';
      try {
        localStorage.setItem(ADMIN_SHELL_KEY, entry === 'traveler' ? 'traveler' : 'console');
      } catch {
        /* ignore */
      }
      setAdminShellState(entry);
    } else {
      setAdminShellState('console');
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      loginWithToken,
      logout,
      isAdmin: user?.role === 'admin',
      adminShell,
      setAdminShell,
    }),
    [user, loading, loginWithToken, logout, adminShell, setAdminShell]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
