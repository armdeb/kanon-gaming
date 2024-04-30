import { SpinResult } from '@/types';

// all reels from the test requirements
const reels = [
  ['cherry', 'lemon', 'apple', 'lemon', 'banana', 'banana', 'lemon', 'lemon'],
  ['lemon', 'apple', 'lemon', 'lemon', 'cherry', 'apple', 'banana', 'lemon'],
  ['lemon', 'apple', 'lemon', 'apple', 'cherry', 'lemon', 'banana', 'lemon']
];

// all possible bonus points
const rewards: Record<string, Record<number, number>> = {
  cherry: { 3: 50, 2: 40 },
  apple: { 3: 20, 2: 10 },
  banana: { 3: 15, 2: 5 },
  lemon: { 3: 3 }
};

/**
 * simulates spinning the reels and calculates the winnings
 *
 * @returns {SpinResult} an object containing the spins and winnings
 * @throws {Error} throws an error if there's an issue during calculating
 */
export function spinReels(): SpinResult {
  const spins = reels.map(reel => reel[Math.floor(Math.random() * reel.length)]);

  try {
    const winnings = calculateWinnings(spins);
    return { spins, winnings };
  } catch (error) {
    throw new Error(`Error spin: ${error instanceof Error ? error.message : error}`);
  }
}

/**
 * calcs the winnings based on the spins
 *
 * @param {string[]} spins - result of spinning reels
 * @returns {number} winnings based on the rules
 * @throws {Error} throws an error if the input is invalid
 */
export function calculateWinnings(spins: string[]): number {
  if (spins.length !== 3) {
    throw new Error('Invalid number of spins');
  } else if (spins[0] === spins[1] && spins[1] === spins[2]) {
    // apple, apple, apple
    return rewards[spins[0]]?.[3] || 0;
  } else if (spins[0] === spins[1] || spins[1] === spins[2]) {
    // apple, apple, lemon or lemon, apple, apple
    return rewards[spins[1]]?.[2] || 0;
  } else {
    // no same
    return 0;
  }
}
