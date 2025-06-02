import { Container, Title, Text, Stack, Group, Card, Badge, Breadcrumbs, Anchor } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconFolder } from '@tabler/icons-react';
import { useState, useEffect } from 'react';

// Временные данные для демонстрации
const mockCategories = [
  {
    id: 1,
    name: 'Безопасность',
    description: 'Статьи о правилах безопасности и охране труда',
    articleCount: 15,
  },
  {
    id: 2,
    name: 'Производство',
    description: 'Статьи о производственных процессах и оборудовании',
    articleCount: 23,
  },
  {
    id: 3,
    name: 'Обучение',
    description: 'Материалы для обучения и повышения квалификации',
    articleCount: 8,
  },
];

export default function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(mockCategories);
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
                <Group gap="xs">
                  <IconFolder size={24} color="var(--mantine-color-blue-6)" />
                  <Title order={3}>{category.name}</Title>
                </Group>
                <Text c="dimmed">{category.description}</Text>
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