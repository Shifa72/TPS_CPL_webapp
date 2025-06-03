import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Category from './pages/Category';
import Article from './pages/Article';
import Articles from './pages/Articles';
import Tags from './pages/Tags';
import Search from './pages/Search';
import Login from './pages/Login';

function App() {
  return (
    <MantineProvider>
      <Notifications />
      <Router basename="/TPS_CPL_webapp">
        <AppShell>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </AppShell>
      </Router>
    </MantineProvider>
  );
}

export default App;

