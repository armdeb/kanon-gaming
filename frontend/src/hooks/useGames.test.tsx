import { fetchGames } from '@/services/gameService';
import { Game } from '@/types';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useGames } from './useGames';

// mocks
jest.mock('@/services/gameService', () => ({
  fetchGames: jest.fn(),
}));

const fetchGamesMock = fetchGames as jest.Mock;

const MockComponent = ({ search }: { search: string }) => {
  const { data: games, isLoading } = useGames(search);

  if (isLoading) return <div>Loading...</div>;
  if (!games) return <div>No games found</div>;
  return (
    <div>
      {games.map((game) => (
        <div key={game.id}>{game.title}</div>
      ))}
    </div>
  );
};

describe('useGames', () => {
  it('calls fetchGames with the correct search term and uses the useQuery hook correctly', async () => {
    const mockGames: Game[] = [
      { id: '1', slug: 'test', title: 'test game title', providerName: 'test provider' },
    ];
    fetchGamesMock.mockResolvedValue(mockGames);

    // render a mocked app for test
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    render(
      <QueryClientProvider client={queryClient}>
        <MockComponent search="test" />
      </QueryClientProvider>
    );

    // should calls useGames hook
    expect(fetchGamesMock).toHaveBeenCalledWith('test');

    // wait the mock game render on screen
    await waitFor(() => {
      expect(screen.getByText('test game title')).toBeInTheDocument();
    });
  });
});
