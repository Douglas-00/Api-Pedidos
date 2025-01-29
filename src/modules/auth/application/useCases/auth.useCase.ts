import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from '../../infra/dto/request.dto';
import { AuthResponseDto } from '../../infra/dto/response.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { FindUserUseCase } from 'src/modules/user/application/useCase/findByEmail.useCase';

@Injectable()
export class UserAuthUseCase {
  private jwtExpirationTime: number;
  constructor(
    private readonly jwtService: JwtService,
    private readonly FindUserUseCase: FindUserUseCase,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTime = this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  async execute({ email, password }: UserLoginDto): Promise<AuthResponseDto> {
    const user = await this.FindUserUseCase.execute(email);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      email: user.email,
      sub: user.id,
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
      expiresIn: this.jwtExpirationTime,
    };
  }
}
