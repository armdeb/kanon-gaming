import { SpinResult } from '@/types';
import { APIBase } from './service';

/**
 * fetches the result of a slot machine spin from API
 * 
 * @returns {Promise<SpinResult>} a promise that resolves to the spin result
 * @throws {Error} throws an error if the network response is not OK
 */
export const fetchSpinResult = async (): Promise<SpinResult> => {
  const response = await fetch(`${APIBase}/slot-machine/spin`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};