import { Container, Title, Text, Stack, Group, Badge, Breadcrumbs, Anchor } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const mockArticle = {
  id: 1,
  title: 'Правила безопасности на рабочем месте',
  category: 'Безопасность',
  date: '2024-03-20',
  tags: ['Безопасность', 'Инструкция'],
  content: `
    <h2>Общие правила безопасности</h2>
    <p>При работе на производстве необходимо соблюдать следующие правила безопасности:</p>
    <ul>
      <li>Использовать средства индивидуальной защиты</li>
      <li>Следовать инструкциям по эксплуатации оборудования</li>
      <li>Поддерживать порядок на рабочем месте</li>
    </ul>
    <h2>Действия в чрезвычайных ситуациях</h2>
    <p>В случае возникновения чрезвычайной ситуации:</p>
    <ol>
      <li>Немедленно сообщить руководителю</li>
      <li>Следовать плану эвакуации</li>
      <li>Оказать первую помощь пострадавшим</li>
    </ol>
  `,
};

export default function Article() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article] = useState(mockArticle);
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
          <Anchor onClick={() => navigate('/categories')}>Категории</Anchor>
          <Anchor onClick={() => navigate(`/category/${article.category}`)}>
            {article.category}
          </Anchor>
          <Text>{article.title}</Text>
        </Breadcrumbs>

        <Stack gap="md">
          <Title order={1}>{article.title}</Title>
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

        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </Stack>
    </Container>
  );
} 