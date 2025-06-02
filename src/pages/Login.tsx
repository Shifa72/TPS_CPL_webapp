import { Container, Title, Text, TextInput, PasswordInput, Button, Stack, Paper } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Добавить реальную авторизацию
      await new Promise(resolve => setTimeout(resolve, 1000)); // Имитация запроса
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="xs" py="xl">
      <Stack gap="xl">
        <Stack gap="xs" ta="center">
          <Title order={1} c="blue.6">
            База знаний
          </Title>
          <Text c="dimmed" size="lg">
            Войдите в систему для доступа к базе знаний
          </Text>
        </Stack>

        <Paper withBorder p="xl" radius="md">
          <form onSubmit={handleLogin}>
            <Stack gap="md">
              <TextInput
                label="Логин"
                placeholder="Введите ваш логин"
                required
                size="md"
              />
              <PasswordInput
                label="Пароль"
                placeholder="Введите ваш пароль"
                required
                size="md"
              />
              <Button
                type="submit"
                loading={loading}
                fullWidth
                size="md"
                mt="md"
              >
                Войти
              </Button>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </Container>
  );
} 