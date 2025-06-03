import { Container, Title, Text, Stack, Group, Card, Badge, Breadcrumbs, Anchor } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Временные данные для демонстрации
const mockCategories = [
  {
    id: 1,
    name: 'Безопасность',
    description: 'Правила и инструкции по безопасности',
    articleCount: 5,
  },
  {
    id: 2,
    name: 'Оборудование',
    description: 'Инструкции по работе с оборудованием',
    articleCount: 3,
  },
  {
    id: 3,
    name: 'Процедуры',
    description: 'Стандартные процедуры работы',
    articleCount: 4,
  },
];

export default function Categories() {
  const navigate = useNavigate();
  const [categories] = useState(mockCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Загрузка категорий с сервера
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Container size="sm" py="xl">
        <Text>Загрузка...</Text>
      </Container>
    );
  }

  return (
    <Container size="sm" py="xl">
      <Stack gap="xl">
        <Breadcrumbs>
          <Anchor onClick={() => navigate('/home')}>Главная</Anchor>
          <Text>Категории</Text>
        </Breadcrumbs>

        <Title order={1}>Категории</Title>

        <Stack gap="md">
          {categories.map((category) => (
            <Card
              key={category.id}
              withBorder
              p="md"
              radius="md"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/category/${category.id}`)}
            >
              <Stack gap="xs">
                <Text fw={500}>{category.name}</Text>
                <Text size="sm" c="dimmed">
                  {category.description}
                </Text>
                <Group gap="xs">
                  <Badge variant="light" color="blue">
                    {category.articleCount} статей
                  </Badge>
                </Group>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
} 