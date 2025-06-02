import { Container, Title, Text, TextInput, PasswordInput, Button, Stack, Anchor } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    // TODO: Реальная регистрация
    const success = await login(email, password);
    if (success) {
      navigate('/home');
    } else {
      setError('Ошибка при регистрации');
    }
  };

  return (
    <Container size="xs" py="xl">
      <Stack gap="xl">
        <Title order={1} ta="center">
          Регистрация
        </Title>

        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <PasswordInput
              label="Пароль"
              placeholder="Ваш пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <PasswordInput
              label="Подтверждение пароля"
              placeholder="Повторите пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {error && (
              <Text c="red" size="sm">
                {error}
              </Text>
            )}

            <Button type="submit" fullWidth>
              Зарегистрироваться
            </Button>
          </Stack>
        </form>

        <Text ta="center">
          Уже есть аккаунт?{' '}
          <Anchor onClick={() => navigate('/login')} component="button">
            Войти
          </Anchor>
        </Text>
      </Stack>
    </Container>
  );
} 