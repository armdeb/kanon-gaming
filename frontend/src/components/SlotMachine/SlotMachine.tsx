import { useResponsive, useSpin } from '@/hooks';
import { coinStore } from '@/stores/coinStore';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Slot } from './Slot';

export interface SlotMachineProps {
  slotAniInterval?: number;
}

export const SlotMachine: React.FC<SlotMachineProps> = observer(({
  slotAniInterval = 1000,
}) => {
  const { data, refetch } = useSpin();
  const [stops, setStops] = useState<(string | undefined)[]>([undefined, undefined, undefined]);
  const [spinning, setSpinning] = useState(false);
  const [winnings, setWinnings] = useState<number | undefined>(undefined);

  const handleSpin = () => {
    if (coinStore.coins > 0) {
      coinStore.subtractCoins(1);

      setSpinning(true);
      setWinnings(undefined);
      setStops([undefined, undefined, undefined]);

      refetch();
    }
  };

  useEffect(() => {
    let timer: number | undefined;
    if (data) {
      // 1. stop spin animation
      let i = 0;
      let newStops = [...stops];
      timer = window.setInterval(() => {
        newStops = [...newStops];
        newStops[i] = data.spins[i];
        setStops(newStops);
        i++;

        if (i >= newStops.length) {
          clearInterval(timer);
          timer = undefined;

          // 2. display winnings and add coins (if win)
          setWinnings(data.winnings);
          if (data.winnings) {
            coinStore.addCoins(data.winnings);
          }

          // 3. enable spin button for next round
          setSpinning(false);
        }
      }, slotAniInterval);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };

    // animation should not update and re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const {
    width: imgWidth,
    height: imgHeight,
  } = useResponsive({
    sm: { width: 75, height: 75 },
    md: { width: 100, height: 100 },
    lg: { width: 150, height: 150 },
  });

  return (
    <div className="text-center" style={{ '--slot-size': imgHeight + 'px' } as React.CSSProperties} data-testid="slot-machine">
      <div
        className="flex justify-center my-5 overflow-hidden"
        style={{
          width: `${imgWidth * stops.length}px`,
          height: 'var(--slot-size)',
          margin: '1.25rem auto',
        }}
      >
        {stops.map((stop, index) => (
          <Slot key={index} imgHeight={imgHeight} stop={stop} spinning={spinning} />
        ))}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSpin}
        disabled={spinning}
        data-testid="spin-button"
      >
        {spinning ? (
          'Spinning...'
        ) : (
          'Spin to Win!'
        )}
      </button>
      <div className="my-5">
        <p data-testid="coins">Coins: {coinStore.coins}</p>

        {winnings !== undefined && (
          <p data-testid="winnings">Winnings: {winnings} coins</p>
        )}
      </div>
    </div>
  );
});
