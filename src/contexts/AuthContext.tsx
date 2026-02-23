import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { initKakao, kakaoLogin, kakaoLogout, type KakaoUser } from '../lib/kakao';

interface AuthContextValue {
  user: KakaoUser | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = 'latin_night_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<KakaoUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as KakaoUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    initKakao();
  }, []);

  async function login() {
    const kakaoUser = await kakaoLogin();
    setUser(kakaoUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(kakaoUser));
  }

  async function logout() {
    await kakaoLogout();
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
