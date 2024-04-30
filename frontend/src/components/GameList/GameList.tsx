import defaultImage from '@/assets/default-image.jpg';
import { useGames } from '@/hooks';
import { throttle } from 'lodash';
import { FC, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { NoGamesFound } from './NoGamesFound';

export const GameList: FC = () => {
  const [search, setSearch] = useState('');
  const [value, setValue] = useState('');
  const { data: games, isLoading } = useGames(search);

  const throttledSearch = throttle((searchValue: string) => {
    setSearch(searchValue);
  }, 500);

  useEffect(() => {
    throttledSearch(value);
  }, [throttledSearch, value]);

  return (
    <div>
      <div className="flex justify-center m-4">
        <input
          className="p-2 border rounded"
          placeholder="Search games"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          data-testid="game-search"
        />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500" data-testid="game-loading"></div>
        </div>
      ) : games && games.length > 0 ? (
        <div className="flex flex-wrap justify-center" data-testid="game-list">
          {games?.map((game) => (
            <div key={game.id} className="w-60 rounded overflow-hidden shadow-lg m-4" data-testid="game-list-item">
              <LazyLoadImage className="w-full" src={game.thumb?.url || defaultImage} alt={game.title} effect="blur" data-testid="game-cover" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2" data-testid="game-title">{game.title}</div>
                <p className="text-gray-700 text-base" data-testid="game-provider">
                  Provider: {game.providerName}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoGamesFound />
      )}

    </div>
  );
};
