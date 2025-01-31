import { Module } from '@nestjs/common';
import { PrismaProductRepository } from './infra/repositories/prisma-product.repository';
import { CreateProductUseCase } from './application/useCases/create.useCase';
import { DeleteProductUseCase } from './application/useCases/delete.useCase';
import { UpdateProductUseCase } from './application/useCases/update.useCase';
import { ShowProductUseCase } from './application/useCases/show.useCase';
import { ListProductUseCase } from './application/useCases/list.useCase';
import { CreateProductController } from './infra/controller/create.controller';
import { DeleteProductController } from './infra/controller/delete.controller';
import { UpdateProductController } from './infra/controller/update.controller';
import { ShowProductController } from './infra/controller/show.controller';
import { ListProductsController } from './infra/controller/list.controller';
import { ValidateProductUseCase } from './application/useCases/validateProduct.useCase';

@Module({
  providers: [
    {
      provide: 'ProductPrismaRepository',
      useClass: PrismaProductRepository,
    },
    CreateProductUseCase,
    DeleteProductUseCase,
    UpdateProductUseCase,
    ShowProductUseCase,
    ListProductUseCase,
    ValidateProductUseCase,
  ],
  controllers: [
    CreateProductController,
    DeleteProductController,
    UpdateProductController,
    ShowProductController,
    ListProductsController,
  ],
  exports: [ValidateProductUseCase],
})
export class ProductModule {}
