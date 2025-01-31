import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProductUseCase } from './update.useCase';
import { AppLogger } from 'src/modules/logger/logger.service';
import { BadRequestException } from '@nestjs/common';
import { ProductMapper } from '../mappers/product.mapper';

describe('UpdateProductUseCase', () => {
  let updateProductUseCase: UpdateProductUseCase;
  let logger: AppLogger;

  const mockProductRepository = {
    findById: jest.fn(),
    update: jest.fn(),
  };

  const mockLogger = {
    warn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProductUseCase,
        {
          provide: 'ProductPrismaRepository',
          useValue: mockProductRepository,
        },
        {
          provide: AppLogger,
          useValue: mockLogger,
        },
      ],
    }).compile();

    updateProductUseCase =
      module.get<UpdateProductUseCase>(UpdateProductUseCase);
    logger = module.get<AppLogger>(AppLogger);
  });

  it('should update product successfully when product exists', async () => {
    const productId = 1;
    const updateDto = {
      name: 'Updated Product',
      price: 60,
      stockQuantity: 5,
      category: 'Updated Category',
      description: 'Updated Description',
    };
    const product = { id: productId, ...updateDto };

    mockProductRepository.findById.mockResolvedValueOnce(product);
    jest.spyOn(ProductMapper, 'toDomainUpdate').mockReturnValueOnce(product);
    mockProductRepository.update.mockResolvedValueOnce(product);
    jest
      .spyOn(ProductMapper, 'toUpdateResponseDto')
      .mockReturnValueOnce(product);

    const result = await updateProductUseCase.execute(productId, updateDto);

    expect(result).toEqual(product);
    expect(mockProductRepository.findById).toHaveBeenCalledWith(productId);
    expect(mockProductRepository.update).toHaveBeenCalledWith(
      productId,
      product,
    );
  });

  it('should throw BadRequestException when product not found', async () => {
    const productId = 1;
    const updateDto = { name: 'Updated Product', price: 60, stockQuantity: 5 };
    mockProductRepository.findById.mockResolvedValueOnce(null);

    await expect(
      updateProductUseCase.execute(productId, updateDto),
    ).rejects.toThrowError(BadRequestException);
    expect(logger.warn).toHaveBeenCalledWith('Product not found');
  });
});
