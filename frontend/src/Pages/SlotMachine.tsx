import { FC } from 'react';
import { SlotMachine } from '../components/SlotMachine/SlotMachine';

const SlotMachinePage: FC = () => {
  return (
    <div>
      <h1 className="text-center text-4xl my-6">Slot Machine</h1>
      <SlotMachine />
    </div>
  );
};

export default SlotMachinePage;