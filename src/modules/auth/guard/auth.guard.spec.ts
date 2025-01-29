import { AuthGuard } from './auth.guard';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test-secret'),
          },
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should throw an UnauthorizedException if no token is provided', async () => {
    const context = createMockExecutionContext({ headers: {} });
    await expect(guard.canActivate(context)).rejects.toThrow(
      new UnauthorizedException('Token not found'),
    );
  });

  it('should throw an UnauthorizedException if token is invalid', async () => {
    jest.spyOn(jwtService, 'verifyAsync').mockRejectedValue('Invalid token');
    const context = createMockExecutionContext({
      headers: { authorization: 'Bearer invalid-token' },
    });
    await expect(guard.canActivate(context)).rejects.toThrow(
      new UnauthorizedException('Invalid token'),
    );
  });

  it('should add user to request if token is valid', async () => {
    const user = { userId: 1, email: 'testuser' };
    jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(user);

    const request = { headers: { authorization: 'Bearer valid-token' } } as any;
    const context = createMockExecutionContext(request);
    const canActivate = await guard.canActivate(context);

    expect(canActivate).toBe(true);
    expect(request['user']).toEqual(user);
  });

  function createMockExecutionContext(request: any): ExecutionContext {
    return {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as any;
  }
});
