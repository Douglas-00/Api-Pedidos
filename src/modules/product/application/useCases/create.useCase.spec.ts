import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductUseCase } from './create.useCase';
import { ProductMapper } from '../mappers/product.mapper';
import { CreateProductRequestDto } from '../../infra/dto/create/request.dto';
import { PrismaService } from 'src/db/prisma.service';

describe('CreateProductUseCase', () => {
  let createProductUseCase: CreateProductUseCase;

  const mockProductRepository = {
    create: jest.fn(),
  };

  const mockPrismaService = {
    $transaction: jest.fn(async (callback) => {
      return callback();
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductUseCase,
        {
          provide: 'ProductPrismaRepository',
          useValue: mockProductRepository,
        },
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    createProductUseCase =
      module.get<CreateProductUseCase>(CreateProductUseCase);
  });

  it('should create a new product successfully', async () => {
    const payload: CreateProductRequestDto = {
      name: 'Product Test',
      description: 'Description Test',
      price: 100,
      category: 'Category Test',
      stockQuantity: 10,
    };

    const newProduct = { id: 1, ...payload };

    jest.spyOn(ProductMapper, 'toDomain').mockReturnValueOnce(newProduct);
    mockProductRepository.create.mockResolvedValueOnce(newProduct);

    const result = await createProductUseCase.execute(payload);

    expect(result).toEqual({
      id: newProduct.id,
      message: 'Product created successfully',
    });
    expect(mockProductRepository.create).toHaveBeenCalledWith(newProduct);
    expect(mockPrismaService.$transaction).toHaveBeenCalled();
  });
});
