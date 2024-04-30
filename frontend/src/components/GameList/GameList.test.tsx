import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useQuery } from 'react-query';
import { GameList } from './GameList';

// mocks
jest.mock('react-lazy-load-image-component', () => {
  const LazyLoadImage = ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />;
  LazyLoadImage.displayName = 'MockLazyImage';
  return { LazyLoadImage };
});
jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));
jest.mock('lodash/throttle', () => jest.fn((fn) => fn));
jest.mock('react-query', () => ({
  ...jest.requireActual('react-query'),
  useQuery: jest.fn(),
}));

const useQueryMock = useQuery as jest.Mock;

describe('GameList', () => {
  it('should renders loading state correctly', () => {
    useQueryMock.mockImplementation(() => ({
      isLoading: true,
      data: null,
    }));

    render(<GameList />);
    expect(screen.getByTestId('game-loading')).toBeInTheDocument();
  });

  it('should renders games list when fetch is successful', async () => {
    const mockGames = [
      { id: '1', title: 'Game 1', providerName: 'Provider 1', thumb: { url: 'http://example.com/game1.jpg' } },
    ];
    useQueryMock.mockImplementation(() => ({
      isLoading: false,
      data: mockGames,
    }));

    render(<GameList />);
    await waitFor(() => {
      expect(screen.getByText('Game 1')).toBeInTheDocument();
      expect(screen.getByAltText('Game 1')).toHaveAttribute('src', 'http://example.com/game1.jpg');
    });
  });

  it('should renders no games found when the list is empty', () => {
    useQueryMock.mockImplementation(() => ({
      isLoading: false,
      data: [],
    }));

    render(<GameList />);
    expect(screen.getByText('No games have been found.')).toBeInTheDocument();
  });

  // more testing will be done in e2e testing
  it('should calls useGames when search', async () => {
    useQueryMock.mockImplementation(() => ({
      isLoading: false,
      data: [],
    }));

    render(<GameList />);
    const input = screen.getByPlaceholderText('Search games');

    // wait for throttle
    await act(async () => {
      await userEvent.type(input, 'test');
    });

    expect(useQueryMock).toHaveBeenCalled();
  });
});
