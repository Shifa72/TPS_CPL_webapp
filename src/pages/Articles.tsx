import { Container, Title, Text, Stack, Group, Card, Badge, Breadcrumbs, Anchor } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Временные данные для демонстрации
const mockArticles = [
  {
    id: 1,
    title: 'Правила безопасности на рабочем месте',
    category: 'Безопасность',
    date: '2024-03-20',
    tags: ['Безопасность', 'Инструкция'],
  },
  {
    id: 2,
    title: 'Инструкция по работе с оборудованием',
    category: 'Оборудование',
    date: '2024-03-19',
    tags: ['Оборудование', 'Инструкция'],
  },
  {
    id: 3,
    title: 'Новые процедуры работы',
    category: 'Процедуры',
    date: '2024-03-18',
    tags: ['Процедуры', 'Документация'],
  },
];

export default function Articles() {
  const navigate = useNavigate();
  const [articles] = useState(mockArticles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Загрузка статей с сервера
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
          <Text>Статьи</Text>
        </Breadcrumbs>

        <Title order={1}>Статьи</Title>

        <Stack gap="md">
          {articles.map((article) => (
            <Card
              key={article.id}
              withBorder
              p="md"
              radius="md"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/article/${article.id}`)}
            >
              <Stack gap="xs">
                <Text fw={500}>{article.title}</Text>
                <Group gap="xs">
                  <Badge variant="light" color="blue">
                    {article.category}
                  </Badge>
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="light">
                      {tag}
                    </Badge>
                  ))}
                </Group>
                <Text size="sm" c="dimmed">
                  {new Date(article.date).toLocaleDateString()}
                </Text>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
} 