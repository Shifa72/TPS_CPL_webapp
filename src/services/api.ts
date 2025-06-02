import axios from 'axios';

// Типы данных
export interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  date: string;
  tags: string[];
}

export interface Category {
  id: number;
  name: string;
  description: string;
  articles: Article[];
}

// Базовый URL API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Создаем экземпляр axios с базовыми настройками
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем перехватчик для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// API для работы со статьями
export const articlesApi = {
  // Получить все статьи
  getAll: () => api.get<Article[]>('/articles').then((res) => res.data),

  // Получить статью по ID
  getById: (id: number) => api.get<Article>(`/articles/${id}`).then((res) => res.data),

  // Поиск статей
  search: (query: string) =>
    api.get<Article[]>(`/articles/search`, { params: { q: query } }).then((res) => res.data),
};

// API для работы с категориями
export const categoriesApi = {
  // Получить все категории
  getAll: () => api.get<Category[]>('/categories').then((res) => res.data),

  // Получить категорию по ID
  getById: (id: number) => api.get<Category>(`/categories/${id}`).then((res) => res.data),
};

// API для аутентификации
export const authApi = {
  // Вход в систему
  login: (username: string, password: string) =>
    api.post('/auth/login', { username, password }).then((res) => res.data),

  // Выход из системы
  logout: () => api.post('/auth/logout').then((res) => res.data),

  // Проверка текущей сессии
  checkSession: () => api.get('/auth/session').then((res) => res.data),
}; 