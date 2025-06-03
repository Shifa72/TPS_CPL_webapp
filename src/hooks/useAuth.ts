import { useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
}

// Список разрешенных email-адресов
const ALLOWED_EMAILS = [
  'admin@example.com',
  'user@example.com',
  'test@example.com'
];

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Проверка токена и загрузка пользователя
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: Валидация токена и загрузка данных пользователя
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email: string) => {
    try {
      // Проверяем, есть ли email в списке разрешенных
      if (!ALLOWED_EMAILS.includes(email)) {
        throw new Error('Email не найден в списке разрешенных');
      }

      // TODO: Реальный запрос к API
      const mockUser = { id: 1, username: 'user', email };
      localStorage.setItem('token', 'mock-token');
      setUser(mockUser);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };
} 