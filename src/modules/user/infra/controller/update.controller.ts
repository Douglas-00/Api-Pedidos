import {
  Controller,
  Put,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { USER_RESOURCE } from './route';
import { UpdateUserUseCase } from '../../application/useCase/update.useCase';
import {
  UpdateUserIdRequestDto,
  UpdateUserRequestDto,
} from '../dto/update/request.dto';
import { UpdateUserResponseDto } from '../dto/update/response.dto';

@ApiTags('Users')
@Controller(USER_RESOURCE)
export class UpdateUserController {
  constructor(private readonly useCase: UpdateUserUseCase) {}

  @Put(':id')
  @ApiOperation({
    summary: 'Update user information',
    description: 'Updates the user’s details by their ID.',
  })
  @ApiResponse({ status: 200, description: 'User updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateUser(
    @Param() { id }: UpdateUserIdRequestDto,
    @Body() updateUserDto: UpdateUserRequestDto,
  ): Promise<UpdateUserResponseDto> {
    return await this.useCase.execute(id, updateUserDto);
  }
}
