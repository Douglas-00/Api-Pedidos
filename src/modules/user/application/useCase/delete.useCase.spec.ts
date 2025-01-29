import { Test, TestingModule } from '@nestjs/testing';
import { AppLogger } from 'src/modules/logger/logger.service';
import { NotFoundException } from '@nestjs/common';
import { DeleteUserUseCase } from './delete.useCase';

describe('DeleteUserUseCase', () => {
  let deleteUserUseCase: DeleteUserUseCase;
  let logger: AppLogger;

  const mockUserRepository = {
    findById: jest.fn(),
    delete: jest.fn(),
  };

  const mockLogger = {
    warn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserUseCase,
        {
          provide: 'UserPrismaRepository',
          useValue: mockUserRepository,
        },
        {
          provide: AppLogger,
          useValue: mockLogger,
        },
      ],
    }).compile();

    deleteUserUseCase = module.get<DeleteUserUseCase>(DeleteUserUseCase);
    logger = module.get<AppLogger>(AppLogger);
  });

  it('should delete a user when the user is found', async () => {
    const userId = 1;
    mockUserRepository.findById.mockResolvedValueOnce({
      id: userId,
      email: 'test@example.com',
    });
    mockUserRepository.delete.mockResolvedValueOnce({});

    const result = await deleteUserUseCase.execute(userId);

    expect(result).toEqual({ message: 'User deleted successfully' });
    expect(mockUserRepository.delete).toHaveBeenCalledWith(userId);
  });

  it('should throw NotFoundException when the user is not found', async () => {
    const userId = 1;
    mockUserRepository.findById.mockResolvedValueOnce(null);

    await expect(deleteUserUseCase.execute(userId)).rejects.toThrowError(
      NotFoundException,
    );
    expect(logger.warn).toHaveBeenCalledWith('User not found');
  });
});
