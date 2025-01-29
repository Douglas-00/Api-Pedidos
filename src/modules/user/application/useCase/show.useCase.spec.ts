import { Test, TestingModule } from '@nestjs/testing';
import { ShowUserUseCase } from './show.useCase';
import { AppLogger } from 'src/modules/logger/logger.service';
import { UserMapper } from '../mappers/user.mapper';

describe('ShowUserUseCase', () => {
  let showUserUseCase: ShowUserUseCase;

  let logger: AppLogger;

  const mockUserRepository = {
    findById: jest.fn(),
  };

  const mockLogger = {
    log: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShowUserUseCase,
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

    showUserUseCase = module.get<ShowUserUseCase>(ShowUserUseCase);
    logger = module.get<AppLogger>(AppLogger);
  });

  it('should return a user when the user exists', async () => {
    const userId = 1;
    const user = { id: userId, email: 'test@example.com' };
    const expectedResponse = { id: userId, email: 'test@example.com' };

    mockUserRepository.findById.mockResolvedValueOnce(user);
    jest
      .spyOn(UserMapper, 'toShowResponseDto')
      .mockReturnValue(expectedResponse);

    const result = await showUserUseCase.execute(userId);

    expect(result).toEqual(expectedResponse);
    expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
    expect(logger.log).toHaveBeenCalledWith('Showing user');
  });
});
