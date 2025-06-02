import { Container, Title, Text, Stack, Button, Group, Card } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container size="sm" py="xl">
      <Stack gap="xl">
        <Title order={1}>Профиль</Title>

        <Card withBorder p="md">
          <Stack gap="md">
            <Group>
              <Text fw={500}>Email:</Text>
              <Text>{user?.email}</Text>
            </Group>
            <Group>
              <Text fw={500}>Имя пользователя:</Text>
              <Text>{user?.username}</Text>
            </Group>
          </Stack>
        </Card>

        <Button color="red" onClick={handleLogout}>
          Выйти
        </Button>
      </Stack>
    </Container>
  );
} 