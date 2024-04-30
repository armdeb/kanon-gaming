import { listGames } from '@/controllers/gameController';
import * as gameService from '@/services/gameService';
import { Game } from '@/types';
import { Request, Response } from 'express';

jest.mock('@/services/gameService');

describe('gameController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonResponse: Game[] | undefined;

  beforeEach(() => {
    jsonResponse = undefined;
    mockRequest = { query: {} };
    mockResponse = createMockResponse();
    (gameService.fetchGames as jest.Mock).mockReset();
  });

  function createMockResponse(): Partial<Response> {
    return {
      json: jest.fn().mockImplementation((result) => {
        jsonResponse = result;
      }),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
  }

  it('should call fetchGames with search parameter and return games list', async () => {
    const mockGames: Game[] = [{ id: '1', title: 'Test Game' }];
    (gameService.fetchGames as jest.Mock).mockResolvedValue(mockGames);

    mockRequest.query = { search: 'test' };

    await listGames(mockRequest as Request, mockResponse as Response, () => {});

    expect(gameService.fetchGames).toHaveBeenCalledWith('test');
    expect(jsonResponse).toEqual(mockGames);
  });

  it('should respond with 500 status code and specific error message on service error', async () => {
    const errorMessage = 'Service Error';
    (gameService.fetchGames as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await listGames(mockRequest as Request, mockResponse as Response, () => {});

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith(`Error reading game data: ${errorMessage}`);
  });

  it('should call fetchGames with undefined search when query is empty', async () => {
    await listGames(mockRequest as Request, mockResponse as Response, () => {});

    expect(gameService.fetchGames).toHaveBeenCalledWith(undefined);
    expect(jsonResponse).toEqual([]);
  });

  it('should respond with empty array when no games are returned', async () => {
    (gameService.fetchGames as jest.Mock).mockResolvedValue([]);

    await listGames(mockRequest as Request, mockResponse as Response, () => {});

    expect(jsonResponse).toEqual([]);
  });

  it('should respond with 500 status code on network error', async () => {
    (gameService.fetchGames as jest.Mock).mockRejectedValue(new Error('Network Error'));

    await listGames(mockRequest as Request, mockResponse as Response, () => {});

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith(expect.stringContaining('Network Error'));
  });

  it('should respond with 500 status code on unexpected response from service', async () => {
    (gameService.fetchGames as jest.Mock).mockResolvedValue(null);

    await listGames(mockRequest as Request, mockResponse as Response, () => {});

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith(expect.stringContaining('Unexpected response'));
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore all mocked functions to their original implementations
  });
});
