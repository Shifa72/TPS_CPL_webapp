// Типы для статей
export interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  date: string;
  tags: string[];
}

// Типы для категорий
export interface Category {
  id: number;
  name: string;
  description: string;
  articles: Article[];
}

// Типы для пользователя
export interface User {
  id: number;
  username: string;
  name: string;
  role: 'admin' | 'user';
}

// Типы для сессии
export interface Session {
  user: User;
  token: string;
}

// Типы для ответа API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
} 