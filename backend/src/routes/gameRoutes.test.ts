import * as gameControllers from '@/controllers/gameController';
import express from 'express';
// eslint-disable-next-line node/no-unpublished-import
import request from 'supertest';
import gameRoutes from './gameRoutes';

jest.mock('@/controllers/gameController', () => ({
  listGames: jest.fn((req, res) => res.status(200).send([]))
}));

describe('gameRoutes', () => {
  const app = express();
  app.use(express.json());
  app.use('/api/games', gameRoutes);

  it('should returns games list correctly', async () => {
    const response = await request(app).get('/api/games/list');

    expect(response.status).toBe(200);
    expect(response.text).toBe('[]'); // http returns text
    expect(gameControllers.listGames).toHaveBeenCalled();
  });
});
