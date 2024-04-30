import { Game } from '@/types';
import fs from 'fs/promises';
import path from 'path';

// simple in-memory cache to avoid reading the file multiple times
// use redis or other service for a bigger dataset
let gamesCache: Game[] | null = null;

/**
 * Reads game data from the JSON file
 * Uses caching to avoid repeated file reading
 * @returns {Promise<Game[]>} list of games
 */
async function readGameData(): Promise<Game[]> {
  if (gamesCache) {
    return gamesCache;
  }

  try {
    const dataPath = path.join(__dirname, '../../data/game-data.json');
    const data = await fs.readFile(dataPath, 'utf8');
    const games = JSON.parse(data) as Game[];

    // validate the games array here
    if (!Array.isArray(games) || !games.every(isValidGame)) {
      throw new Error('Invalid game data');
    }

    gamesCache = games;
    return games;
  } catch (error) {
    throw new Error(`Failed to read game data: ${error instanceof Error ? error.message : error}`);
  }
}

/**
 * Validates if the provided object matches the Game type
 * @param game - game object to be validated
 * @returns {boolean} true if the object is a valid Game, false is not
 */
function isValidGame(game: any): game is Game {
  return game &&
    typeof game === 'object' &&
    typeof game.id === 'string' &&
    typeof game.slug === 'string' &&
    typeof game.title === 'string' &&
    typeof game.providerName === 'string' &&
    !game.thumb || typeof game.thumb.url === 'string';
}

/**
 * Fetches games, could also filter games by title
 * @param search - optional search term to filter games by title
 * @returns {Promise<Game[]>} filtered list of games if a search term is provided, otherwise all
 */
export const fetchGames = async (search?: string): Promise<Game[]> => {
  const games = await readGameData();

  if (!search) {
    return games;
  }

  return games.filter(game =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );
};
