import { Container, Title, Text, Stack, Group, Badge, Breadcrumbs, Anchor } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Временные данные для демонстрации
const mockTags = [
  { id: 1, name: 'безопасность', count: 12 },
  { id: 2, name: 'инструкция', count: 8 },
  { id: 3, name: 'СИЗ', count: 5 },
  { id: 4, name: 'обучение', count: 7 },
  { id: 5, name: 'пожарная безопасность', count: 3 },
];

export default function Tags() {
  const navigate = useNavigate();
  const [tags, setTags] = useState(mockTags);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Загрузка тегов с сервера
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
          <Text>Теги</Text>
        </Breadcrumbs>

        <Title order={1}>Теги</Title>

        <Group gap="md">
          {tags.map((tag) => (
            <Badge
              key={tag.id}
              size="lg"
              variant="light"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/tag/${tag.id}`)}
            >
              {tag.name} ({tag.count})
            </Badge>
          ))}
        </Group>
      </Stack>
    </Container>
  );
} 