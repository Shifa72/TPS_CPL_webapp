import { Container, Title, Text, Stack, Group, Card, Badge, Breadcrumbs, Anchor } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { IconClock, IconFolder } from '@tabler/icons-react';
import { useState, useEffect } from 'react';

// Временные данные для демонстрации
const mockCategory = {
  id: 1,
  name: 'Безопасность',
  description: 'Статьи о правилах безопасности и охране труда',
  articles: [
    {
      id: 1,
      title: 'Правила безопасности на рабочем месте',
      date: '2024-03-20',
      tags: ['безопасность', 'инструкция'],
    },
    {
      id: 2,
      title: 'Средства индивидуальной защиты',
      date: '2024-03-19',
      tags: ['СИЗ', 'обучение'],
    },
    {
      id: 3,
      title: 'Правила пожарной безопасности',
      date: '2024-03-18',
      tags: ['пожарная безопасность'],
    },
  ],
};

export default function Category() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(mockCategory);
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
          <Text>{category.name}</Text>
        </Breadcrumbs>

        <Stack gap="xs">
          <Group gap="xs">
            <IconFolder size={24} color="var(--mantine-color-blue-6)" />
            <Title order={1}>{category.name}</Title>
          </Group>
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
                <Group gap="md">
                  <Group gap={4}>
                    <IconClock size={14} />
                    <Text size="sm" c="dimmed">
                      {new Date(article.date).toLocaleDateString()}
                    </Text>
                  </Group>
                  <Group gap="xs">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="light" color="gray">
                        {tag}
                      </Badge>
                    ))}
                  </Group>
                </Group>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
} 