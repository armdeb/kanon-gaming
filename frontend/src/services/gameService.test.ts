import { fetchGames } from './gameService';

describe('fetchGames', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should returns a list of games on success', async () => {
    const mockGames = [{ id: '1', title: 'Test Game' }];
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockGames),
    });

    const games = await fetchGames('');
    expect(games).toEqual(mockGames);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/api/games/list?');
  });

  it('should throws an error when the response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });

    await expect(fetchGames('')).rejects.toThrow('Network response was not ok');
  });
});
