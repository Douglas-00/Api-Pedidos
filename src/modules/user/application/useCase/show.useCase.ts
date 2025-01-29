import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { UserMapper } from '../mappers/user.mapper';
import { AppLogger } from 'src/modules/logger/logger.service';
import { ShowUserResponseDto } from '../../infra/dto/show/response.dto';

@Injectable()
export class ShowUserUseCase {
  constructor(
    @Inject('UserPrismaRepository')
    private readonly userRepository: UserRepository,
    private readonly logger: AppLogger,
  ) {}

  async execute(userId: number): Promise<ShowUserResponseDto> {
    this.logger.log('Showing user');
    const users = await this.userRepository.findById(userId);

    return UserMapper.toShowResponseDto(users);
  }
}
