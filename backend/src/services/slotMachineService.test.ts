import { calculateWinnings } from './slotMachineService';

describe('calculateWinnings', () => {
  it('should returns correct winnings for a single fruit', () => {
    expect(calculateWinnings(['cherry', 'cherry', 'cherry'])).toBe(50);
    expect(calculateWinnings(['apple', 'apple', 'apple'])).toBe(20);
    expect(calculateWinnings(['banana', 'banana', 'banana'])).toBe(15);
    expect(calculateWinnings(['lemon', 'lemon', 'lemon'])).toBe(3);
  });

  it('should returns correct winnings for mixed fruits', () => {
    // 2 cherries
    expect(calculateWinnings(['cherry', 'cherry', 'apple'])).toBe(40);
    expect(calculateWinnings(['apple', 'cherry', 'cherry'])).toBe(40);

    // 2 apples
    expect(calculateWinnings(['apple', 'apple', 'lemon'])).toBe(10);
    expect(calculateWinnings(['lemon', 'apple', 'apple'])).toBe(10);

    // 2 bananas
    expect(calculateWinnings(['banana', 'banana', 'lemon'])).toBe(5);
    expect(calculateWinnings(['lemon', 'banana', 'banana'])).toBe(5);
  });

  it('should returns 0 for no matching rewards', () => {
    expect(calculateWinnings(['cherry', 'apple', 'cherry'])).toBe(0);
    expect(calculateWinnings(['cherry', 'apple', 'banana'])).toBe(0);
  });

  it('should throws error for illegal input', () => {
    expect(() => calculateWinnings([])).toThrow('Invalid number of spins');
    expect(() => calculateWinnings(['apple', 'apple', 'apple', 'apple'])).toThrow('Invalid number of spins');
  });
});
