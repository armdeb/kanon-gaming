import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Slot } from './Slot';

describe('Slot', () => {
  const imgHeight = 100;

  it('should spins forever when spinning is true', () => {
    const { container } = render(<Slot imgHeight={imgHeight} spinning={true} />);
    const slotImgContainer = container.firstChild;
    expect(slotImgContainer).toHaveStyleRule('animation', expect.stringContaining('linear'));
    expect(slotImgContainer).toHaveStyleRule('animation', expect.stringContaining('infinite'));
  });

  it('should stops on a specific item when stop is not undefined', () => {
    const stop = 'apple';
    const { container } = render(<Slot imgHeight={imgHeight} spinning={false} stop={stop} />);
    const slotImgContainer = container.firstChild;
    expect(slotImgContainer).toHaveStyleRule('animation', expect.stringContaining('ease-out'));
    expect(slotImgContainer).toHaveStyleRule('animation', expect.not.stringContaining('infinite'));
  });
});
