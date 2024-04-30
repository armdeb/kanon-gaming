import { CoinStore } from './coinStore';

describe('CoinStore', () => {
  let coinStore: CoinStore;

  beforeEach(() => {
    coinStore = new CoinStore();
  });

  it('should has 20 coins initially', () => {
    expect(coinStore.coins).toBe(20);
  });

  it('should adds coins correctly', () => {
    coinStore.addCoins(10);
    expect(coinStore.coins).toBe(30);
  });

  it('should subtracts coins correctly', () => {
    coinStore.subtractCoins(5);
    expect(coinStore.coins).toBe(15);
  });

  it('should reset coins back to the initial state', () => {
    coinStore.addCoins(10);
    coinStore.subtractCoins(5);

    coinStore.resetCoins();
    expect(coinStore.coins).toBe(20);
  });
});
