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
const slotMachineController_1 = require("./slotMachineController");
const slotMachineService = __importStar(require("@/services/slotMachineService"));
jest.mock('@/services/slotMachineService');
describe('spinReels Controller', () => {
    let mockReq;
    let mockRes;
    let mockSend;
    let mockJson;
    let mockStatus;
    beforeEach(() => {
        mockSend = jest.fn();
        mockJson = jest.fn();
        mockStatus = jest.fn(() => ({ send: mockSend }));
        mockReq = {};
        mockRes = {
            send: mockSend,
            json: mockJson,
            status: mockStatus,
        };
        jest.clearAllMocks(); // Clear all mock function calls before each test
    });
    it('should call spinReels and return the result', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockResult = { spins: ['apple', 'banana', 'cherry'], winnings: 0 };
        slotMachineService.spinReels.mockReturnValue(mockResult);
        yield (0, slotMachineController_1.spinReels)(mockReq, mockRes, () => { });
        expect(slotMachineService.spinReels).toHaveBeenCalled();
        expect(mockJson).toHaveBeenCalledWith(mockResult);
    }));
    it('should handle errors and return status 500 with specific error message', () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = 'Error spinning the reels';
        slotMachineService.spinReels.mockImplementation(() => {
            throw new Error(errorMessage);
        });
        yield (0, slotMachineController_1.spinReels)(mockReq, mockRes, () => { });
        expect(mockStatus).toHaveBeenCalledWith(500);
        expect(mockSend).toHaveBeenCalledWith(`Error spinning: ${errorMessage}`);
    }));
    // Additional test cases can be added to cover more scenarios, such as empty request or specific input values
});
