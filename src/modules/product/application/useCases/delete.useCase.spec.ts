import { Test, TestingModule } from '@nestjs/testing';
import { DeleteProductUseCase } from './delete.useCase';
import { AppLogger } from 'src/modules/logger/logger.service';
import { BadRequestException } from '@nestjs/common';

describe('DeleteProductUseCase', () => {
  let deleteProductUseCase: DeleteProductUseCase;
  let logger: AppLogger;

  const mockProductRepository = {
    findById: jest.fn(),
    delete: jest.fn(),
  };

  const mockLogger = {
    warn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteProductUseCase,
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

    deleteProductUseCase =
      module.get<DeleteProductUseCase>(DeleteProductUseCase);
    logger = module.get<AppLogger>(AppLogger);
  });

  it('should delete a product successfully', async () => {
    const productId = 1;
    mockProductRepository.findById.mockResolvedValueOnce({ id: productId });
    mockProductRepository.delete.mockResolvedValueOnce(undefined);

    const result = await deleteProductUseCase.execute(productId);

    expect(result).toEqual({ message: 'Product deleted successfully' });
    expect(mockProductRepository.findById).toHaveBeenCalledWith(productId);
    expect(mockProductRepository.delete).toHaveBeenCalledWith(productId);
  });

  it('should throw BadRequestException when product is not found', async () => {
    const productId = 1;
    mockProductRepository.findById.mockResolvedValueOnce(null);

    await expect(deleteProductUseCase.execute(productId)).rejects.toThrowError(
      BadRequestException,
    );
    expect(logger.warn).toHaveBeenCalledWith('Product not found');
  });
});
