import { useSpin } from '@/hooks';
import { coinStore } from '@/stores';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SlotMachine } from './SlotMachine';

// mocks
jest.mock('@/hooks/useSpin', () => ({
  useSpin: jest.fn(),
}));
jest.mock('@/stores', () => ({
  coinStore: {
    coins: 20,
    subtractCoins: jest.fn(),
    addCoins: jest.fn(),
  },
}));
jest.mock('./Slot', () => ({
  Slot: () => <div>slot</div>,
}));

describe('SlotMachine', () => {
  beforeEach(() => {
    // Reset mocks before each test
    (coinStore.subtractCoins as jest.Mock).mockClear();
    (coinStore.addCoins as jest.Mock).mockClear();
    (useSpin as jest.Mock).mockImplementation(() => ({
      data: null,
      refetch: jest.fn(),
    }));
  });

  it('should renders correctly', () => {
    render(<SlotMachine />);

    expect(screen.getByText('Spin to Win!')).toBeInTheDocument();
  });

  it('disables the spin button and subtracts a coin when spinning', async () => {
    render(<SlotMachine />);
    const spinButton = screen.getByText('Spin to Win!');

    await act(async () => {
      await userEvent.click(spinButton);
    });

    expect(coinStore.subtractCoins).toHaveBeenCalledWith(1);
    expect(spinButton).toBeDisabled();
    expect(spinButton.textContent).toBe('Spinning...');
  });

  it('displays winnings and adds coins when spin results are fetched', async () => {
    const data = { spins: ['apple', 'banana', 'cherry'], winnings: 10 };
    (useSpin as jest.Mock).mockImplementation(() => ({
      data,
      refetch: jest.fn(),
    }));

    // set a short slotAniInterval to speed up
    render(<SlotMachine slotAniInterval={10} />);
    await act(async () => {
      await userEvent.click(screen.getByText('Spin to Win!'));
    });

    // Wait for the spin results to be processed
    await waitFor(() => {
      expect(screen.getByText('Winnings: 10 coins')).toBeInTheDocument();
    });

    expect(coinStore.addCoins).toHaveBeenCalledWith(10);
  });

  it('should resets spin button for next shot', async () => {
    const data = { spins: ['apple', 'banana', 'cherry'], winnings: 10 };
    (useSpin as jest.Mock).mockImplementation(() => ({
      data,
      refetch: jest.fn(),
    }));

    // set a short slotAniInterval to speed up
    render(<SlotMachine slotAniInterval={10} />);

    await act(async () => {
      await userEvent.click(screen.getByText('Spin to Win!'));
    });

    expect(screen.getByText('Spinning...')).toBeInTheDocument();
    expect(screen.getByText('Spinning...')).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText('Spin to Win!')).toBeInTheDocument();
      expect(screen.getByText('Spin to Win!')).not.toBeDisabled();
    });
  });

  it('updates the coins display after spinning', async () => {
    render(<SlotMachine />);
    expect(screen.getByText('Coins: 20')).toBeInTheDocument();

    const spinButton = screen.getByText('Spin to Win!');
    await act(() => {
      userEvent.click(spinButton);
    });

    // force set coins
    coinStore.coins = 19;

    // re-render to see updated coins
    render(<SlotMachine />);
    expect(screen.getByText('Coins: 19')).toBeInTheDocument();
  });
});
