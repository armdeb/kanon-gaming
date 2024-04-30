import { render, screen } from '@testing-library/react';
import { useResponsive } from './useResponsive';

describe('useResponsive', () => {
  // /react-hooks could not be used on react 18, use a component instead
  const TestComponent = () => {
    const { width, height } = useResponsive({
      sm: { width: 100, height: 100 },
      md: { width: 200, height: 200 },
      lg: { width: 300, height: 300 },
    });

    return (
      <div>
        {width},{height}
      </div>
    );
  };

  // helper for resize
  const mockWindowWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    window.dispatchEvent(new Event('resize'));
  };

  it('should returns lg size for window width >= 768px', () => {
    mockWindowWidth(800);
    render(<TestComponent />);
    expect(screen.getByText('300,300')).toBeInTheDocument();
  });

  it('should returns md size for window width between 640px and 767px', () => {
    mockWindowWidth(700);
    render(<TestComponent />);
    expect(screen.getByText('200,200')).toBeInTheDocument();
  });

  it('should returns sm size for window width < 640px', () => {
    mockWindowWidth(600);
    render(<TestComponent />);
    expect(screen.getByText('100,100')).toBeInTheDocument();
  });
});
