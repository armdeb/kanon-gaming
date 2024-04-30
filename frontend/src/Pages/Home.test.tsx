import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomePage from './Home';

describe('HomePage', () => {
  const TestComponent = () => {
    const queryClient = new QueryClient();

    return (
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    );
  };
  it('should renders the page title correctly', () => {

    render(<TestComponent />);

    expect(screen.getByText('Game List')).toBeInTheDocument();
  });
});
