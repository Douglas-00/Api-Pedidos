import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { USER_RESOURCE } from './route';
import { ShowUserUseCase } from '../../application/useCase/show.useCase';
import { ShowUserResponseDto } from '../dto/show/response.dto';
import { ShowUserRequestDto } from '../dto/show/request.dto';

@ApiTags('Users')
@Controller(USER_RESOURCE)
export class ShowUserController {
  constructor(private readonly useCase: ShowUserUseCase) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Show user details',
    description: 'Fetches the details of a specific user by their ID.',
  })
  @ApiResponse({ status: 200, description: 'User found.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async showUser(
    @Param() { id }: ShowUserRequestDto,
  ): Promise<ShowUserResponseDto> {
    return await this.useCase.execute(id);
  }
}
