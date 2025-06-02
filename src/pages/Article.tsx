import { Container, Title, Text, Stack, Group, Badge, Paper, Breadcrumbs, Anchor } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { IconClock, IconUser, IconFolder } from '@tabler/icons-react';
import { useState, useEffect } from 'react';

// Временные данные для демонстрации
const mockArticle = {
  id: 1,
  title: 'Правила безопасности на рабочем месте',
  content: `
    <h2>Общие правила безопасности</h2>
    <p>При работе на производстве необходимо соблюдать следующие правила безопасности:</p>
    <ul>
      <li>Всегда использовать средства индивидуальной защиты</li>
      <li>Следить за исправностью оборудования</li>
      <li>Соблюдать технологические процессы</li>
      <li>Немедленно сообщать о любых неисправностях</li>
    </ul>
    <h2>Средства защиты</h2>
    <p>К обязательным средствам защиты относятся:</p>
    <ul>
      <li>Защитные очки</li>
      <li>Перчатки</li>
      <li>Защитная обувь</li>
      <li>Каска (при необходимости)</li>
    </ul>
  `,
  category: 'Безопасность',
  author: 'Иванов И.И.',
  date: '2024-03-20',
  tags: ['безопасность', 'инструкция', 'обучение'],
};

export default function Article() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(mockArticle);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Загрузка статьи с сервера
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
          <Anchor onClick={() => navigate(`/category/${article.category}`)}>
            {article.category}
          </Anchor>
          <Text>{article.title}</Text>
        </Breadcrumbs>

        <Stack gap="md">
          <Title order={1}>{article.title}</Title>
          
          <Group gap="md">
            <Group gap={4}>
              <IconClock size={16} />
              <Text size="sm" c="dimmed">
                {new Date(article.date).toLocaleDateString()}
              </Text>
            </Group>
            <Group gap={4}>
              <IconUser size={16} />
              <Text size="sm" c="dimmed">
                {article.author}
              </Text>
            </Group>
            <Group gap={4}>
              <IconFolder size={16} />
              <Badge variant="light" color="blue">
                {article.category}
              </Badge>
            </Group>
          </Group>

          <Paper withBorder p="md" radius="md">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </Paper>

          <Group gap="xs">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="light" color="gray">
                {tag}
              </Badge>
            ))}
          </Group>
        </Stack>
      </Stack>
    </Container>
  );
} 