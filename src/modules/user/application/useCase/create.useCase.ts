import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { CreateUserRequestDto } from '../../infra/dto/create/request.dto';
import { CreateUserResponseDto } from '../../infra/dto/create/response.dto';
import { UserRepository } from '../domain/repositories/user.repository';
import { UserMapper } from '../mappers/user.mapper';
import * as bcrypt from 'bcrypt';
import { AppLogger } from 'src/modules/logger/logger.service';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserPrismaRepository')
    private readonly userRepository: UserRepository,
    private readonly logger: AppLogger,
  ) {}

  async execute(payload: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const existingUser = await this.userRepository.findByEmail(payload.email);

    if (existingUser) {
      this.logger.warn('User already exists');
      throw new ConflictException('User already exists');
    }

    const hashPass = await bcrypt.hash(payload.password, 10);

    const user = UserMapper.toDomain(payload, hashPass);

    const newUser = await this.userRepository.create(user);

    return {
      id: newUser.id,
      message: 'User created successfully',
    };
  }
}
