import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { NoGamesFound } from './NoGamesFound';

describe('NoGamesFound', () => {
  it('should renders correctly and displays the "No games have been found." message', () => {
    render(<NoGamesFound />);
    expect(screen.getByText('No games have been found.')).toBeInTheDocument();
  });
});
