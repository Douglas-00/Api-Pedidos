import { Test, TestingModule } from '@nestjs/testing';

import { JwtService } from '@nestjs/jwt';
import { FindUserUseCase } from 'src/modules/user/application/useCase/findByEmail.useCase';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { UserAuthUseCase } from './auth.useCase';

describe('UserAuthUseCase', () => {
  let useCase: UserAuthUseCase;
  let jwtService: JwtService;

  const mockUser = {
    email: 'test@example.com',
    password: 'hashedPassword',
    id: 1,
  };
  const mockToken = 'mockToken123';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserAuthUseCase,
        {
          provide: JwtService,
          useValue: { sign: jest.fn(() => mockToken) },
        },
        {
          provide: FindUserUseCase,
          useValue: { execute: jest.fn(() => mockUser) },
        },
        {
          provide: ConfigService,
          useValue: { get: jest.fn(() => 3600) },
        },
      ],
    }).compile();

    useCase = module.get<UserAuthUseCase>(UserAuthUseCase);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should generate a token when email and password are correct', async () => {
    const userLoginDto = {
      email: 'test@example.com',
      password: 'correctPassword',
    };

    jest.spyOn(bcrypt, 'compare' as any).mockResolvedValue(true);

    const result = await useCase.execute(userLoginDto);

    expect(result).toEqual({
      token: mockToken,
      expiresIn: 3600,
    });
    expect(jwtService.sign).toHaveBeenCalledWith({
      email: mockUser.email,
      sub: mockUser.id,
    });
  });

  it('should throw an UnauthorizedException when password is invalid', async () => {
    const userLoginDto = {
      email: 'test@example.com',
      password: 'incorrectPassword',
    };

    jest.spyOn(bcrypt, 'compare' as any).mockResolvedValue(false);

    await expect(useCase.execute(userLoginDto)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
