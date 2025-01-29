import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserUseCase } from './update.useCase';
import { AppLogger } from 'src/modules/logger/logger.service';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('UpdateUserUseCase', () => {
  let updateUserUseCase: UpdateUserUseCase;

  let logger: AppLogger;

  const mockUserRepository = {
    findById: jest.fn(),
    update: jest.fn(),
  };

  const mockLogger = {
    warn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserUseCase,
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

    updateUserUseCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);
    logger = module.get<AppLogger>(AppLogger);
  });

  it('should update a user when the user exists', async () => {
    const userId = 1;
    const updateUserDto = {
      email: 'new-email@example.com',
      password: 'newPassword123',
    };
    const updatedUser = { id: userId, email: updateUserDto.email };
    mockUserRepository.findById.mockResolvedValueOnce({
      id: userId,
      email: 'test@example.com',
    });
    mockUserRepository.update.mockResolvedValueOnce(updatedUser);
    jest.spyOn(bcrypt, 'hash' as any).mockResolvedValue('newPassword123');

    const result = await updateUserUseCase.execute(userId, updateUserDto);

    expect(result).toEqual({
      id: userId,
      message: 'User updated successfully',
    });
    expect(mockUserRepository.update).toHaveBeenCalledWith(
      userId,
      updateUserDto,
    );
    expect(bcrypt.hash).toHaveBeenCalledWith(updateUserDto.password, 10);
  });

  it('should throw NotFoundException when the user is not found', async () => {
    const userId = 1;
    const updateUserDto = {
      email: 'new-email@example.com',
      password: 'newPassword123',
    };
    mockUserRepository.findById.mockResolvedValueOnce(null);

    await expect(
      updateUserUseCase.execute(userId, updateUserDto),
    ).rejects.toThrowError(NotFoundException);
    expect(logger.warn).toHaveBeenCalledWith('User not found');
  });
});
