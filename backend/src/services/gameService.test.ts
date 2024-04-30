import { fetchGames } from '@/services/gameService';
import { Game } from '@/types';
import * as fs from 'fs/promises';

jest.mock('fs/promises');

describe('fetchGames', () => {
  const mockGames: Game[] = [
    { id: '1', slug: 'game 1', title: 'game 1', providerName: 'provider 1', thumb: { url: 'http://example.com/thumb1.jpg' } },
    { id: '2', slug: 'game 2', title: 'game 2', providerName: 'provider 2' },
    { id: '3', slug: 'game 3', title: 'game 3', providerName: 'provider 3' }
  ];

  // reset mock implementations before each test
  beforeEach(() => {
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockGames));
  });

  it('should returns all games when no search query is provided', async () => {
    const games = await fetchGames();
    expect(games).toEqual(mockGames);
    expect(games.length).toBe(mockGames.length);
  });

  it('should filters games based on a search query', async () => {
    const search = 'game 1';

    const filteredGames = await fetchGames(search);
    expect(filteredGames).toEqual([mockGames[0]]);
  });

  it('should returns an empty array when search query does not match any game titles', async () => {
    const search = 'nonexistent game';

    const filteredGames = await fetchGames(search);
    expect(filteredGames).toEqual([]);
  });
});
