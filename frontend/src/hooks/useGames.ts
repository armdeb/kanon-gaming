import { fetchGames } from '@/services';
import { useQuery } from 'react-query';

export function useGames(search: string) {
  return useQuery(['games', search], () => fetchGames(search), {
    keepPreviousData: true,
  });
}