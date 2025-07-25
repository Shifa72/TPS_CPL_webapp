import { Container, Title, Text, Stack, Group, Card, Badge, Breadcrumbs, Anchor } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Временные данные для демонстрации
const mockCategory = {
  id: 1,
  name: 'Безопасность',
  description: 'Правила и инструкции по безопасности',
  articles: [
    {
      id: 1,
      title: 'Правила безопасности на рабочем месте',
      date: '2024-03-20',
      tags: ['Безопасность', 'Инструкция'],
    },
    {
      id: 2,
      title: 'Средства индивидуальной защиты',
      date: '2024-03-19',
      tags: ['СИЗ', 'Обучение'],
    },
  ],
};

export default function Category() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category] = useState(mockCategory);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Загрузка категории с сервера
    setLoading(false);
  }, [id]);

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
          <Anchor onClick={() => navigate('/categories')}>Категории</Anchor>
          <Text>{category.name}</Text>
        </Breadcrumbs>

        <Stack gap="md">
          <Title order={1}>{category.name}</Title>
          <Text c="dimmed">{category.description}</Text>
        </Stack>

        <Stack gap="md">
          {category.articles.map((article) => (
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