import { MantineProvider, createTheme } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import { AppShell } from './components/AppShell';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Category from './pages/Category';
import Tags from './pages/Tags';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Article from './pages/Article';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import { useAuth } from './hooks/useAuth';
import { WebApp } from './config/telegram';

// SLB цвета
const theme = createTheme({
  primaryColor: 'blue',
  colors: {
    blue: [
      '#E3F2FD', // 0
      '#BBDEFB', // 1
      '#90CAF9', // 2
      '#64B5F6', // 3
      '#42A5F5', // 4
      '#2196F3', // 5 - основной цвет SLB
      '#1E88E5', // 6
      '#1976D2', // 7
      '#1565C0', // 8
      '#0D47A1', // 9
    ],
  },
  fontFamily: 'Inter, sans-serif',
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        radius: 'md',
        withBorder: true,
      },
    },
  },
});

export default function App() {
  const { isAuthenticated } = useAuth();

  // Проверяем, запущено ли приложение в Telegram
  const isTelegramWebApp = WebApp.platform !== 'unknown';

  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <Router>
        <AppShell isTelegramWebApp={isTelegramWebApp}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/tag/:id" element={<Tags />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/search" element={<Search />} />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/login"
              element={!isAuthenticated ? <Login /> : <Navigate to="/home" replace />}
            />
            <Route
              path="/register"
              element={!isAuthenticated ? <Register /> : <Navigate to="/home" replace />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppShell>
      </Router>
    </MantineProvider>
  );
}
