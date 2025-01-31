import { Test, TestingModule } from '@nestjs/testing';
import { ShowProductUseCase } from './show.useCase';
import { AppLogger } from 'src/modules/logger/logger.service';
import { BadRequestException } from '@nestjs/common';
import { ProductMapper } from '../mappers/product.mapper';

describe('ShowProductUseCase', () => {
  let showProductUseCase: ShowProductUseCase;
  let logger: AppLogger;

  const mockProductRepository = {
    findById: jest.fn(),
  };

  const mockLogger = {
    warn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShowProductUseCase,
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

    showProductUseCase = module.get<ShowProductUseCase>(ShowProductUseCase);
    logger = module.get<AppLogger>(AppLogger);
  });

  it('should show product details when product exists', async () => {
    const productId = 1;
    const product = {
      id: productId,
      name: 'Product A',
      price: 50,
      stockQuantity: 10,
    };

    mockProductRepository.findById.mockResolvedValueOnce(product);
    jest.spyOn(ProductMapper, 'toResponseDto').mockReturnValueOnce(product);

    const result = await showProductUseCase.execute(productId);

    expect(result).toEqual(product);
    expect(mockProductRepository.findById).toHaveBeenCalledWith(productId);
  });

  it('should throw BadRequestException when product not found', async () => {
    const productId = 1;
    mockProductRepository.findById.mockResolvedValueOnce(null);

    await expect(showProductUseCase.execute(productId)).rejects.toThrowError(
      BadRequestException,
    );
    expect(logger.warn).toHaveBeenCalledWith('Product not found');
  });
});
