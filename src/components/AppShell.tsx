import { AppShell as MantineAppShell, Burger, Group, Title, ActionIcon, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch, IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { WebApp } from '../config/telegram';

interface AppShellProps {
  children: React.ReactNode;
  isTelegramWebApp: boolean;
}

export function AppShell({ children, isTelegramWebApp }: AppShellProps) {
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
      header={{ height: isTelegramWebApp ? 0 : 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      {!isTelegramWebApp && (
        <MantineAppShell.Header>
          <Group h="100%" px="md" justify="space-between">
            <Group>
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <Title order={3} onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
                TPC
              </Title>
            </Group>

            <Group>
              <form onSubmit={handleSearch} style={{ width: 300 }}>
                <TextInput
                  placeholder="Поиск..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftSection={<IconSearch size={16} />}
                  size="sm"
                />
              </form>
              <ActionIcon variant="subtle" onClick={() => navigate('/profile')}>
                <IconUser size={20} />
              </ActionIcon>
            </Group>
          </Group>
        </MantineAppShell.Header>
      )}

      <MantineAppShell.Navbar p="md">
        <Group>
          <Title order={3}>Меню</Title>
        </Group>
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>{children}</MantineAppShell.Main>
    </MantineAppShell>
  );
} 