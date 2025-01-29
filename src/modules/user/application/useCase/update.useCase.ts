import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../domain/repositories/user.repository';
import { UpdateUserResponseDto } from '../../infra/dto/update/response.dto';
import { UpdateUserRequestDto } from '../../infra/dto/update/request.dto';
import { UserMapper } from '../mappers/user.mapper';
import * as bcrypt from 'bcrypt';
import { AppLogger } from 'src/modules/logger/logger.service';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('UserPrismaRepository')
    private readonly userRepository: UserRepository,
    private readonly logger: AppLogger,
  ) {}

  async execute(
    userId: number,
    updateUserDto: UpdateUserRequestDto,
  ): Promise<UpdateUserResponseDto> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      this.logger.warn('User not found');
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.password) {
      this.logger.warn('Password will be updated');
      const hashPass = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hashPass;
    }

    const updatedUser = await this.userRepository.update(userId, updateUserDto);

    return UserMapper.toUpdateResponseDto(updatedUser);
  }
}
