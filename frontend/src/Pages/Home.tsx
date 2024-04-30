import { FC } from 'react';
import { GameList } from '../components/GameList/GameList';

const HomePage: FC = () => {
  return (
    <div>
      <h1 className="text-center text-4xl my-6">Game List</h1>
      <GameList />
    </div>
  );
};

// use default for the lazy load import()
export default HomePage;