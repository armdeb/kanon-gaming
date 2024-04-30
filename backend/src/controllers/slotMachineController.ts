import * as slotMachineService from '@/services/slotMachineService';
import { sendServerError } from '@/utils/error';
import { Handler } from 'express';

export const spinReels: Handler = async (req, res) => {
  try {
    const result = slotMachineService.spinReels();

    res.json(result);
  } catch (error) {
    sendServerError(res, `Error spinning: ${error instanceof Error ? error.message : error}`);
  }
};
