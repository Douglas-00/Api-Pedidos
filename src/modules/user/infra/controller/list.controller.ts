import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { USER_RESOURCE } from './route';
import { ListUserUseCase } from '../../application/useCase/list.useCase';
import { ListUserResponseDto } from '../dto/list/response.dto';

@ApiTags('Users')
@Controller(USER_RESOURCE)
export class ListUsersController {
  constructor(private readonly useCase: ListUserUseCase) {}

  @Get()
  @ApiOperation({
    summary: 'List all users',
    description: 'Fetches all users from the system.',
  })
  @ApiResponse({ status: 200, description: 'Users found.' })
  async listUsers(): Promise<ListUserResponseDto[]> {
    return await this.useCase.execute();
  }
}
