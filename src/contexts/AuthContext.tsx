import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { authApi } from '../services/api';
import type { User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const session = await authApi.checkSession();
      setIsAuthenticated(true);
      setUser(session.user);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await authApi.login(username, password);
      setIsAuthenticated(true);
      setUser(response.user);
      notifications.show({
        title: 'Успешно',
        message: 'Вы успешно вошли в систему',
        color: 'blue',
      });
      navigate('/home');
    } catch (error) {
      notifications.show({
        title: 'Ошибка',
        message: 'Неверный логин или пароль',
        color: 'red',
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      setIsAuthenticated(false);
      setUser(null);
      notifications.show({
        title: 'Успешно',
        message: 'Вы успешно вышли из системы',
        color: 'blue',
      });
      navigate('/');
    } catch (error) {
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось выйти из системы',
        color: 'red',
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 