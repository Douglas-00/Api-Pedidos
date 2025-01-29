import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/useCase/create.useCase';
import { DeleteUserUseCase } from './application/useCase/delete.useCase';
import { UpdateUserUseCase } from './application/useCase/update.useCase';
import { ShowUserUseCase } from './application/useCase/show.useCase';
import { ListUserUseCase } from './application/useCase/list.useCase';
import { PrismaUserRepository } from './infra/repositories/prisma-user.repository';
import { CreateUserController } from './infra/controller/create.controller';
import { DeleteUserController } from './infra/controller/delete.controller';
import { UpdateUserController } from './infra/controller/update.controller';
import { ShowUserController } from './infra/controller/show.controller';
import { ListUsersController } from './infra/controller/list.controller';
import { FindUserUseCase } from './application/useCase/findByEmail.useCase';

@Module({
  providers: [
    {
      provide: 'UserPrismaRepository',
      useClass: PrismaUserRepository,
    },
    CreateUserUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    FindUserUseCase,
    ShowUserUseCase,
    ListUserUseCase,
  ],
  controllers: [
    CreateUserController,
    DeleteUserController,
    UpdateUserController,
    ShowUserController,
    ListUsersController,
  ],
  exports: [FindUserUseCase],
})
export class UserModule {}
