import { Container, Title, Text, SimpleGrid, Card, Group, Stack, Button, Badge } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconSearch, IconBook, IconClock } from '@tabler/icons-react';
import { useState, useEffect } from 'react';

// Временные данные для демонстрации
const categories = [
  { id: 1, name: 'Безопасность', count: 15 },
  { id: 2, name: 'Процедуры', count: 23 },
  { id: 3, name: 'Оборудование', count: 45 },
  { id: 4, name: 'Обучение', count: 12 },
];

const recentArticles = [
  { id: 1, title: 'Правила безопасности на рабочем месте', category: 'Безопасность', date: '2024-03-20' },
  { id: 2, title: 'Инструкция по работе с оборудованием', category: 'Оборудование', date: '2024-03-19' },
  { id: 3, title: 'Новые процедуры работы', category: 'Процедуры', date: '2024-03-18' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container size="sm" py="xl">
      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <Title order={2}>База знаний</Title>
          <Button
            leftSection={<IconSearch size={16} />}
            variant="light"
            onClick={() => navigate('/search')}
          >
            Поиск
          </Button>
        </Group>

        <Stack gap="md">
          <Title order={3} size="h4">Категории</Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            {categories.map((category) => (
              <Card
                key={category.id}
                withBorder
                p="md"
                radius="md"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/category/${category.id}`)}
              >
                <Group justify="space-between">
                  <Stack gap={0}>
                    <Text fw={500}>{category.name}</Text>
                    <Text size="sm" c="dimmed">
                      {category.count} статей
                    </Text>
                  </Stack>
                  <IconBook size={24} color="var(--mantine-color-blue-6)" />
                </Group>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>

        <Stack gap="md">
          <Title order={3} size="h4">Последние статьи</Title>
          <Stack gap="md">
            {recentArticles.map((article) => (
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
                    <Group gap={4}>
                      <IconClock size={14} />
                      <Text size="sm" c="dimmed">
                        {new Date(article.date).toLocaleDateString()}
                      </Text>
                    </Group>
                  </Group>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
} 