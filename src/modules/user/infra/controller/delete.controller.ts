import {
  Controller,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { USER_RESOURCE } from './route';
import { DeleteUserUseCase } from '../../application/useCase/delete.useCase';
import { DeleteUserRequestDto } from '../dto/delete/request.dto';
import { DeleteUserResponseDto } from '../dto/delete/response.dto';

@ApiTags('Users')
@Controller(USER_RESOURCE)
export class DeleteUserController {
  constructor(private readonly useCase: DeleteUserUseCase) {}

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a user',
    description: 'Deletes the user by their ID.',
  })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteUser(
    @Param() { id }: DeleteUserRequestDto,
  ): Promise<DeleteUserResponseDto> {
    return await this.useCase.execute(id);
  }
}
