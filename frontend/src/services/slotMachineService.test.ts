import { SpinResult } from '@/types';
import { fetchSpinResult } from './slotMachineService';

describe('fetchSpinResult', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should returns the spin result when the response is ok', async () => {
    const mockSpinResult: SpinResult = { spins: ['lemon', 'lemon', 'lemon'], winnings: 3 };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockSpinResult),
    });

    const result = await fetchSpinResult();
    expect(result).toEqual(mockSpinResult);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/api/slot-machine/spin');
  });

  it('should throws an error when the response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      statusText: 'Network response was not ok',
    });

    await expect(fetchSpinResult).rejects.toThrow('Network response was not ok');
  });
});
