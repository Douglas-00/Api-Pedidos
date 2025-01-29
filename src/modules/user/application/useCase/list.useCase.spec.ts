import { Test, TestingModule } from '@nestjs/testing';
import { ListUserUseCase } from './list.useCase';
import { AppLogger } from 'src/modules/logger/logger.service';

describe('ListUserUseCase', () => {
  let listUserUseCase: ListUserUseCase;

  const mockUserRepository = {
    list: jest.fn(),
  };

  const mockLogger = {
    log: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListUserUseCase,
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

    listUserUseCase = module.get<ListUserUseCase>(ListUserUseCase);
  });

  it('should return a list of users', async () => {
    const users = [{ id: 1, email: 'test@example.com' }];
    mockUserRepository.list.mockResolvedValueOnce(users);

    const result = await listUserUseCase.execute();

    expect(result).toEqual(users);
    expect(mockUserRepository.list).toHaveBeenCalled();
  });
});
