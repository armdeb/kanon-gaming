import { Request, Response } from 'express';
import { spinReels } from './slotMachineController';
import * as slotMachineService from '@/services/slotMachineService';

jest.mock('@/services/slotMachineService');

describe('spinReels Controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockSend: jest.Mock;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

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

  it('should call spinReels and return the result', async () => {
    const mockResult = { spins: ['apple', 'banana', 'cherry'], winnings: 0 };
    (slotMachineService.spinReels as jest.Mock).mockReturnValue(mockResult);

    await spinReels(mockReq as Request, mockRes as Response, () => {});

    expect(slotMachineService.spinReels).toHaveBeenCalled();
    expect(mockJson).toHaveBeenCalledWith(mockResult);
  });

  it('should handle errors and return status 500 with specific error message', async () => {
    const errorMessage = 'Error spinning the reels';
    (slotMachineService.spinReels as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    await spinReels(mockReq as Request, mockRes as Response, () => {});

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockSend).toHaveBeenCalledWith(`Error spinning: ${errorMessage}`);
  });

  // Additional test cases can be added to cover more scenarios, such as empty request or specific input values
});
