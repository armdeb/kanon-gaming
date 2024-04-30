import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NavHead } from './NavHead';

describe('NavHead', () => {
  // render NavHead within BrowserRouter for testing
  const renderNavHead = () => render(
    <BrowserRouter>
      <NavHead />
    </BrowserRouter>
  );

  it('should renders correctly', () => {
    renderNavHead();
  });

  it('should displays the company logo', () => {
    renderNavHead();
    const logoImages = screen.getAllByAltText('Kanon Gaming');
    expect(logoImages).toHaveLength(2); // pc and mobile
  });

  it('should has a link to the game list page', () => {
    renderNavHead();
    const gameListLink = screen.getByText('Game List');
    expect(gameListLink).toBeInTheDocument();
    expect(gameListLink).toHaveAttribute('href', '/');
  });

  it('should has a link to the slot machine page', () => {
    renderNavHead();
    const slotMachineLink = screen.getByText('Slot Machine');
    expect(slotMachineLink).toBeInTheDocument();
    expect(slotMachineLink).toHaveAttribute('href', '/slot-machine');
  });
});
