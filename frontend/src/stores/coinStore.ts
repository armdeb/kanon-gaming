import { makeAutoObservable } from 'mobx';

export class CoinStore {
  coins = 20;

  constructor() {
    makeAutoObservable(this);
  }

  addCoins(amount: number) {
    this.coins += amount;
  }

  subtractCoins(amount: number) {
    this.coins -= amount;
  }

  resetCoins() {
    this.coins = 20;
  }
}

export const coinStore = new CoinStore();
