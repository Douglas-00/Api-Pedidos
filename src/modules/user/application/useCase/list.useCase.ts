import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { ListUserResponseDto } from '../../infra/dto/list/response.dto';
import { UserMapper } from '../mappers/user.mapper';
import { AppLogger } from 'src/modules/logger/logger.service';

@Injectable()
export class ListUserUseCase {
  constructor(
    @Inject('UserPrismaRepository')
    private readonly userRepository: UserRepository,
    private readonly logger: AppLogger,
  ) {}

  async execute(): Promise<ListUserResponseDto[]> {
    this.logger.log('Listing users');
    const users = await this.userRepository.list();

    return UserMapper.toListResponseDto(users);
  }
}
