"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const slotMachineService_1 = require("./slotMachineService");
describe('calculateWinnings', () => {
    it('should returns correct winnings for a single fruit', () => {
        expect((0, slotMachineService_1.calculateWinnings)(['cherry', 'cherry', 'cherry'])).toBe(50);
        expect((0, slotMachineService_1.calculateWinnings)(['apple', 'apple', 'apple'])).toBe(20);
        expect((0, slotMachineService_1.calculateWinnings)(['banana', 'banana', 'banana'])).toBe(15);
        expect((0, slotMachineService_1.calculateWinnings)(['lemon', 'lemon', 'lemon'])).toBe(3);
    });
    it('should returns correct winnings for mixed fruits', () => {
        // 2 cherries
        expect((0, slotMachineService_1.calculateWinnings)(['cherry', 'cherry', 'apple'])).toBe(40);
        expect((0, slotMachineService_1.calculateWinnings)(['apple', 'cherry', 'cherry'])).toBe(40);
        // 2 apples
        expect((0, slotMachineService_1.calculateWinnings)(['apple', 'apple', 'lemon'])).toBe(10);
        expect((0, slotMachineService_1.calculateWinnings)(['lemon', 'apple', 'apple'])).toBe(10);
        // 2 bananas
        expect((0, slotMachineService_1.calculateWinnings)(['banana', 'banana', 'lemon'])).toBe(5);
        expect((0, slotMachineService_1.calculateWinnings)(['lemon', 'banana', 'banana'])).toBe(5);
    });
    it('should returns 0 for no matching rewards', () => {
        expect((0, slotMachineService_1.calculateWinnings)(['cherry', 'apple', 'cherry'])).toBe(0);
        expect((0, slotMachineService_1.calculateWinnings)(['cherry', 'apple', 'banana'])).toBe(0);
    });
    it('should throws error for illegal input', () => {
        expect(() => (0, slotMachineService_1.calculateWinnings)([])).toThrow('Invalid number of spins');
        expect(() => (0, slotMachineService_1.calculateWinnings)(['apple', 'apple', 'apple', 'apple'])).toThrow('Invalid number of spins');
    });
});
