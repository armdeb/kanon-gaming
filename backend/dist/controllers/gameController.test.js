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
const gameController_1 = require("@/controllers/gameController");
const gameService = __importStar(require("@/services/gameService"));
jest.mock('@/services/gameService');
describe('gameController', () => {
    let mockRequest;
    let mockResponse;
    let jsonResponse;
    beforeEach(() => {
        jsonResponse = undefined;
        mockRequest = { query: {} };
        mockResponse = createMockResponse();
        gameService.fetchGames.mockReset();
    });
    function createMockResponse() {
        return {
            json: jest.fn().mockImplementation((result) => {
                jsonResponse = result;
            }),
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };
    }
    it('should call fetchGames with search parameter and return games list', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockGames = [{ id: '1', title: 'Test Game' }];
        gameService.fetchGames.mockResolvedValue(mockGames);
        mockRequest.query = { search: 'test' };
        yield (0, gameController_1.listGames)(mockRequest, mockResponse, () => { });
        expect(gameService.fetchGames).toHaveBeenCalledWith('test');
        expect(jsonResponse).toEqual(mockGames);
    }));
    it('should respond with 500 status code and specific error message on service error', () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = 'Service Error';
        gameService.fetchGames.mockRejectedValue(new Error(errorMessage));
        yield (0, gameController_1.listGames)(mockRequest, mockResponse, () => { });
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith(`Error reading game data: ${errorMessage}`);
    }));
    it('should call fetchGames with undefined search when query is empty', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, gameController_1.listGames)(mockRequest, mockResponse, () => { });
        expect(gameService.fetchGames).toHaveBeenCalledWith(undefined);
        expect(jsonResponse).toEqual([]);
    }));
    it('should respond with empty array when no games are returned', () => __awaiter(void 0, void 0, void 0, function* () {
        gameService.fetchGames.mockResolvedValue([]);
        yield (0, gameController_1.listGames)(mockRequest, mockResponse, () => { });
        expect(jsonResponse).toEqual([]);
    }));
    it('should respond with 500 status code on network error', () => __awaiter(void 0, void 0, void 0, function* () {
        gameService.fetchGames.mockRejectedValue(new Error('Network Error'));
        yield (0, gameController_1.listGames)(mockRequest, mockResponse, () => { });
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith(expect.stringContaining('Network Error'));
    }));
    it('should respond with 500 status code on unexpected response from service', () => __awaiter(void 0, void 0, void 0, function* () {
        gameService.fetchGames.mockResolvedValue(null);
        yield (0, gameController_1.listGames)(mockRequest, mockResponse, () => { });
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith(expect.stringContaining('Unexpected response'));
    }));
    afterEach(() => {
        jest.restoreAllMocks(); // Restore all mocked functions to their original implementations
    });
});
