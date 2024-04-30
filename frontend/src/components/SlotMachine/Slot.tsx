import React from 'react';
import styled, { keyframes } from 'styled-components';

import apple from '@/assets/apple.png';
import banana from '@/assets/banana.png';
import cherry from '@/assets/cherry.png';
import lemon from '@/assets/lemon.png';

export interface SlotProps {
  imgHeight: number;
  spinning: boolean;
  stop?: string;
}
export const Slot: React.FC<SlotProps> = ({ imgHeight, spinning, stop }) => {
  const images = [cherry, lemon, apple, banana, cherry]; // one more `cherry` from seamless scrolling
  const stops: Record<string, number> = {
    cherry: -imgHeight * 4, // to avoid the cherry stopping immediately
    lemon: -imgHeight * 1,
    apple: -imgHeight * 2,
    banana: -imgHeight * 3,
  };

  let props: SlotImageContainerProps;

  if (stop) {
    props = {
      top: stops[stop],
      type: 'ease-out',
      count: 1,
    };
  } else {
    if (spinning) {
      props = {
        top: -(images.length - 1) * imgHeight, // remove excess `cherry`
        type: 'linear',
        count: 'infinite',
      };
    } else {
      props = {
        top: 0,
        type: 'linear',
        count: 0,
      };
    }
  }

  return (
    <SlotImgContainer {...props} data-testid="slot-machine-item">
      <SlotImg src={cherry} />
      <SlotImg src={lemon} />
      <SlotImg src={apple} />
      <SlotImg src={banana} />
      <SlotImg src={cherry} />
    </SlotImgContainer>
  );
};

const spinAnimation = (top: number) => keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(${top}px);
  }
`;

interface SlotImageContainerProps {
  top: number;
  type: 'linear' | 'ease-out';
  count: 'infinite' | number;
}

const SlotImgContainer = styled.div<SlotImageContainerProps>`
  animation: ${({ top }) => spinAnimation(top)} 0.2s ${({ type }) => type} forwards ${({ count }) => count};
`;

const SlotImg = styled.img`
  width: var(--slot-size);
  height: var(--slot-size);
`;