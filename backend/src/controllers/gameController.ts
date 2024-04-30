import * as gameService from '@/services/gameService';
import { sendServerError } from '@/utils/error';
import { Handler } from 'express';

export const listGames: Handler = async (req, res) => {
  try {
    const { search } = req.query;
    const games = await gameService.fetchGames(search as string | undefined);
    res.json(games);
  } catch (error) {
    sendServerError(res, `Error reading game data: ${error instanceof Error ? error.message : error}`);
  }
};
