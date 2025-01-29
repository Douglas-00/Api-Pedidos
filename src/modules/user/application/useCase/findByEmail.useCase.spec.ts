import { Test, TestingModule } from '@nestjs/testing';
import { AppLogger } from 'src/modules/logger/logger.service';
import { NotFoundException } from '@nestjs/common';
import { FindUserUseCase } from './findByEmail.useCase';

describe('FindUserUseCase', () => {
  let findUserUseCase: FindUserUseCase;
  let logger: AppLogger;

  const mockUserRepository = {
    findByEmail: jest.fn(),
  };

  const mockLogger = {
    warn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserUseCase,
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

    findUserUseCase = module.get<FindUserUseCase>(FindUserUseCase);
    logger = module.get<AppLogger>(AppLogger);
  });

  it('should find a user by email', async () => {
    const email = 'test@example.com';
    mockUserRepository.findByEmail.mockResolvedValueOnce({ id: 1, email });

    const result = await findUserUseCase.execute(email);

    expect(result).toEqual({ id: 1, email });
  });

  it('should throw NotFoundException when the user is not found', async () => {
    const email = 'test@example.com';
    mockUserRepository.findByEmail.mockResolvedValueOnce(null);

    await expect(findUserUseCase.execute(email)).rejects.toThrowError(
      NotFoundException,
    );
    expect(logger.warn).toHaveBeenCalledWith('User not found');
  });
});
