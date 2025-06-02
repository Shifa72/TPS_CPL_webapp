import { Container, Title, Text, Stack, Group, Card, Badge, TextInput, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconSearch, IconClock, IconArrowLeft } from '@tabler/icons-react';
import { useState } from 'react';

// Временные данные для демонстрации
const mockSearchResults = [
  {
    id: 1,
    title: 'Правила безопасности на рабочем месте',
    category: 'Безопасность',
    date: '2024-03-20',
    tags: ['безопасность', 'инструкция'],
    excerpt: 'При работе на производстве необходимо соблюдать следующие правила безопасности...',
  },
  {
    id: 2,
    title: 'Средства индивидуальной защиты',
    category: 'Безопасность',
    date: '2024-03-19',
    tags: ['СИЗ', 'обучение'],
    excerpt: 'К обязательным средствам защиты относятся защитные очки, перчатки...',
  },
];

export default function Search() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(mockSearchResults);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Реализовать поиск на сервере
    console.log('Searching for:', searchQuery);
  };

  return (
    <Container size="sm" py="xl">
      <Stack gap="xl">
        <Group>
          <Button
            variant="light"
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => navigate('/home')}
          >
            Назад
          </Button>
        </Group>

        <Stack gap="md">
          <Title order={2}>Поиск</Title>
          <form onSubmit={handleSearch}>
            <Group gap="xs">
              <TextInput
                placeholder="Введите поисковый запрос..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ flex: 1 }}
                size="md"
              />
              <Button type="submit" leftSection={<IconSearch size={16} />}>
                Найти
              </Button>
            </Group>
          </form>
        </Stack>

        <Stack gap="md">
          {results.map((result) => (
            <Card
              key={result.id}
              withBorder
              p="md"
              radius="md"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/article/${result.id}`)}
            >
              <Stack gap="xs">
                <Text fw={500}>{result.title}</Text>
                <Text size="sm" c="dimmed" lineClamp={2}>
                  {result.excerpt}
                </Text>
                <Group gap="md">
                  <Badge variant="light" color="blue">
                    {result.category}
                  </Badge>
                  <Group gap={4}>
                    <IconClock size={14} />
                    <Text size="sm" c="dimmed">
                      {new Date(result.date).toLocaleDateString()}
                    </Text>
                  </Group>
                  <Group gap="xs">
                    {result.tags.map((tag) => (
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