import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { AppLogger } from 'src/modules/logger/logger.service';
import * as bcrypt from 'bcrypt';
import { CreateUserUseCase } from './create.useCase';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let logger: AppLogger;

  const mockUserRepository = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockLogger = {
    warn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
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

    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    logger = module.get<AppLogger>(AppLogger);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a new user when email is not taken', async () => {
    const payload = {
      name: 'John Doe',
      email: 'test@example.com',
      password: 'password123',
    };

    mockUserRepository.findByEmail.mockResolvedValueOnce(null);
    mockUserRepository.create.mockResolvedValueOnce({ id: 1 });

    jest.spyOn(bcrypt, 'hash' as any).mockResolvedValue('hashedPassword');

    const result = await useCase.execute(payload);

    expect(result).toEqual({
      id: 1,
      message: 'User created successfully',
    });

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(payload.email);
    expect(mockUserRepository.create).toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalledWith(payload.password, 10);
  });

  it('should throw ConflictException when email is already taken', async () => {
    const payload = {
      name: 'John Doe',
      email: 'test@example.com',
      password: 'password123',
    };

    mockUserRepository.findByEmail.mockResolvedValueOnce({
      id: 1,
      email: payload.email,
    });

    await expect(useCase.execute(payload)).rejects.toThrowError(
      ConflictException,
    );
    expect(logger.warn).toHaveBeenCalledWith('User already exists');
  });
});
