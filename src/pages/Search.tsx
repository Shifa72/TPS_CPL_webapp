import { Container, Title, Text, Stack, Group, Card, Badge, Breadcrumbs, Anchor, TextInput } from "@mantine/core";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IconSearch } from "@tabler/icons-react";

const mockArticles = [
  {
    id: 1,
    title: "Правила безопасности на рабочем месте",
    category: "Безопасность",
    date: "2024-03-20",
    tags: ["Безопасность", "Инструкция"],
  },
  {
    id: 2,
    title: "Инструкция по работе с оборудованием",
    category: "Оборудование",
    date: "2024-03-19",
    tags: ["Оборудование", "Инструкция"],
  },
  {
    id: 3,
    title: "Новые процедуры работы",
    category: "Процедуры",
    date: "2024-03-18",
    tags: ["Процедуры", "Документация"],
  },
];

export default function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [tagFilter] = useState(searchParams.get("tag") || "");
  const [articles] = useState(mockArticles);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Поиск статей на сервере
    setLoading(false);
  }, [searchQuery, tagFilter]);

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
          <Anchor onClick={() => navigate("/home")}>Главная</Anchor>
          <Text>Поиск</Text>
        </Breadcrumbs>

        <Title order={1}>Поиск</Title>

        <TextInput
          placeholder="Поиск..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftSection={<IconSearch size={16} />}
        />

        {tagFilter && (
          <Group gap="xs">
            <Text>Тег:</Text>
            <Badge variant="light" color="blue">
              {tagFilter}
            </Badge>
          </Group>
        )}

        <Stack gap="md">
          {articles.map((article) => (
            <Card
              key={article.id}
              withBorder
              p="md"
              radius="md"
              style={{ cursor: "pointer" }}
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