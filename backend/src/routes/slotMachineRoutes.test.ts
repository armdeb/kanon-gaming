import * as slotMachineController from '@/controllers/slotMachineController';
import express from 'express';
// eslint-disable-next-line node/no-unpublished-import
import request from 'supertest';
import slotMachineRoutes from './slotMachineRoutes';

jest.mock('@/controllers/slotMachineController', () => ({
  spinReels: jest.fn((req, res) => res.status(200).send({}))
}));

describe('slotMachineRoutes', () => {
  const app = express();
  app.use(express.json());
  app.use('/api/slot-machine', slotMachineRoutes);

  it('should return spin result correctly', async () => {
    const response = await request(app).get('/api/slot-machine/spin');

    expect(response.status).toBe(200);
    expect(response.text).toBe('{}'); // http returns text
    expect(slotMachineController.spinReels).toHaveBeenCalled();
  });
});
