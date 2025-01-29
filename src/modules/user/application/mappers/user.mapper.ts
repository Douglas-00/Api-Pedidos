import { CreateUserRequestDto } from '../../infra/dto/create/request.dto';
import { ListUserResponseDto } from '../../infra/dto/list/response.dto';
import { ShowUserResponseDto } from '../../infra/dto/show/response.dto';
import { UpdateUserResponseDto } from '../../infra/dto/update/response.dto';
import { User } from '../domain/entities/user.entity';

export class UserMapper {
  static toDomain(payload: CreateUserRequestDto, hashPassword: string) {
    return {
      name: payload.name,
      email: payload.email,
      password: hashPassword,
    };
  }

  static toListResponseDto(users: Partial<User>[]): ListUserResponseDto[] {
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  }

  static toShowResponseDto(user: Partial<User>): ShowUserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  static toFindResponseDto(user: Partial<User>): ShowUserResponseDto {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
    };
  }

  static toUpdateResponseDto(user: User): UpdateUserResponseDto {
    return {
      id: user.id,
      message: 'User updated successfully',
    };
  }
}
