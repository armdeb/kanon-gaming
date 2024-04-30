import * as slotMachineController from '@/controllers/slotMachineController';
import express from 'express';

const router = express.Router();

router.get('/spin', slotMachineController.spinReels);

export default router;
