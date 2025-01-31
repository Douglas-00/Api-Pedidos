import { Module } from '@nestjs/common';
import { PrismaOrderRepository } from './infra/repositories/prisma-order.repository';
import { CreateOrderUseCase } from './application/useCases/create.useCase';
import { DeleteOrderUseCase } from './application/useCases/delete.useCase';
import { UpdateOrderUseCase } from './application/useCases/update.useCase';
import { ShowOrderUseCase } from './application/useCases/show.useCase';
import { ListOrdersUseCase } from './application/useCases/list.useCase';
import { CreateOrderController } from './infra/controller/create.controller';
import { DeleteOrderController } from './infra/controller/delete.controller';
import { UpdateOrderController } from './infra/controller/update.controller';
import { ListOrdersController } from './infra/controller/list.controller';
import { ShowOrderController } from './infra/controller/show.controller';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [ProductModule],
  providers: [
    {
      provide: 'OrderPrismaRepository',
      useClass: PrismaOrderRepository,
    },
    CreateOrderUseCase,
    DeleteOrderUseCase,
    UpdateOrderUseCase,
    ShowOrderUseCase,
    ListOrdersUseCase,
  ],
  controllers: [
    CreateOrderController,
    DeleteOrderController,
    UpdateOrderController,
    ShowOrderController,
    ListOrdersController,
  ],
  exports: [],
})
export class OrderModule {}
