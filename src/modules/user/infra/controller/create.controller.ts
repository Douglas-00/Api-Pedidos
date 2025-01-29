import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { USER_RESOURCE } from './route';
import { CreateUserUseCase } from '../../application/useCase/create.useCase';
import { CreateUserRequestDto } from '../dto/create/request.dto';
import { CreateUserResponseDto } from '../dto/create/response.dto';

@ApiTags('Users')
@Controller(USER_RESOURCE)
export class CreateUserController {
  constructor(private readonly useCase: CreateUserUseCase) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Creates a new user with the provided data.',
  })
  @ApiResponse({ status: 400, description: 'Validation failed.' })
  @ApiResponse({ status: 409, description: 'User already exists.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(
    @Body() createUserDto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return await this.useCase.execute(createUserDto);
  }
}
