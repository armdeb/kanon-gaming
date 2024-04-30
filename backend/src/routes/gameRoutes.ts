import * as gameControllers from '@/controllers/gameController';
import express from 'express';

const router = express.Router();

router.get('/list', gameControllers.listGames);

export default router;
