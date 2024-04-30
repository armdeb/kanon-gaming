import { fetchSpinResult } from '@/services';
import { SpinResult } from '@/types';
import { act, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useSpin } from './useSpin';

// mock
jest.mock('@/services', () => ({
  fetchSpinResult: jest.fn(),
}));

describe('useSpin', () => {
  const TestComponent = () => {
    const { data } = useSpin();
    return (
      <div>
        <div>spins: {data?.spins.join(',')}</div>
        <div>winnings: {data?.winnings}</div>
      </div>
    );
  };

  it('should request the spin API and returns the spin result', async () => {
    const queryClient = new QueryClient();
    const fetchSpinResultMock = fetchSpinResult as jest.Mock;
    const spinResult: SpinResult = { spins: ['lemon', 'lemon', 'lemon'], winnings: 3 };
    fetchSpinResultMock.mockResolvedValue(spinResult);

    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    );

    // Forces any outstanding queries to complete
    await act(async () => {
      await queryClient.refetchQueries();
    });

    expect(screen.getByText('spins: lemon,lemon,lemon')).toBeInTheDocument();
    expect(screen.getByText('winnings: 3')).toBeInTheDocument();
  });
});
