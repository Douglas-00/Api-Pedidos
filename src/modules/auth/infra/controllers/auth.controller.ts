import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AUTH_RESOURCE } from './route';
import { UserLoginDto } from '../dto/request.dto';
import { Response } from 'express';
import { AuthResponseDto } from '../dto/response.dto';
import { UserAuthUseCase } from '../../application/useCases/auth.useCase';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller(AUTH_RESOURCE)
export class AuthController {
  constructor(private readonly useCase: UserAuthUseCase) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login',
    description: 'Endpoint to authenticate a user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User authenticated successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async loginUser(
    @Body() data: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    res.setHeader('authentication', '01');

    return await this.useCase.execute(data);
  }
}
