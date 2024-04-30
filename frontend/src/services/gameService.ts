import { Game } from '@/types';
import { APIBase } from './service';

export const fetchGames = async (search: string): Promise<Game[]> => {
  const params = new URLSearchParams();
  if (search) {
    params.append('search', search);
  }

  const response = await fetch(`${APIBase}/games/list?${params}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};