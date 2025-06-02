import { Container, Title, Text, Button, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container size="sm" py="xl">
      <Stack align="center" gap="xl">
        <Title order={1}>404</Title>
        <Text size="xl" ta="center">
          Страница не найдена
        </Text>
        <Button onClick={() => navigate('/home')}>Вернуться на главную</Button>
      </Stack>
    </Container>
  );
} 