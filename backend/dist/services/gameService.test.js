"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const gameService_1 = require("@/services/gameService");
const fs = __importStar(require("fs/promises"));
jest.mock('fs/promises');
describe('fetchGames', () => {
    const mockGames = [
        { id: '1', slug: 'game 1', title: 'game 1', providerName: 'provider 1', thumb: { url: 'http://example.com/thumb1.jpg' } },
        { id: '2', slug: 'game 2', title: 'game 2', providerName: 'provider 2' },
        { id: '3', slug: 'game 3', title: 'game 3', providerName: 'provider 3' }
    ];
    // reset mock implementations before each test
    beforeEach(() => {
        fs.readFile.mockResolvedValue(JSON.stringify(mockGames));
    });
    it('should returns all games when no search query is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const games = yield (0, gameService_1.fetchGames)();
        expect(games).toEqual(mockGames);
        expect(games.length).toBe(mockGames.length);
    }));
    it('should filters games based on a search query', () => __awaiter(void 0, void 0, void 0, function* () {
        const search = 'game 1';
        const filteredGames = yield (0, gameService_1.fetchGames)(search);
        expect(filteredGames).toEqual([mockGames[0]]);
    }));
    it('should returns an empty array when search query does not match any game titles', () => __awaiter(void 0, void 0, void 0, function* () {
        const search = 'nonexistent game';
        const filteredGames = yield (0, gameService_1.fetchGames)(search);
        expect(filteredGames).toEqual([]);
    }));
});
