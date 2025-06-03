import { AppShell as MantineAppShell, Burger, Group, Title, ActionIcon, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch, IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <MantineAppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <MantineAppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title order={3} onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
              TPC Knowledge Base
            </Title>
          </Group>
          <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: 400, margin: '0 20px' }}>
            <TextInput
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftSection={<IconSearch size={16} />}
              style={{ width: '100%' }}
            />
          </form>
          <Group>
            <ActionIcon variant="subtle" onClick={() => navigate('/login')} title="Войти">
              <IconUser size={20} />
            </ActionIcon>
          </Group>
        </Group>
      </MantineAppShell.Header>

      <MantineAppShell.Navbar p="md">
        <Group>
          <Title order={4}>Меню</Title>
        </Group>
        <Group mt="xl" gap="xs">
          <div onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>Главная</div>
        </Group>
        <Group mt="md" gap="xs">
          <div onClick={() => navigate('/categories')} style={{ cursor: 'pointer' }}>Категории</div>
        </Group>
        <Group mt="md" gap="xs">
          <div onClick={() => navigate('/articles')} style={{ cursor: 'pointer' }}>Статьи</div>
        </Group>
        <Group mt="md" gap="xs">
          <div onClick={() => navigate('/tags')} style={{ cursor: 'pointer' }}>Теги</div>
        </Group>
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
} 