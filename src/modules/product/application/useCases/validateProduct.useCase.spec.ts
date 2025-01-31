import { Test, TestingModule } from '@nestjs/testing';
import { ValidateProductUseCase } from './validateProduct.useCase';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('ValidateProductUseCase', () => {
  let validateProductUseCase: ValidateProductUseCase;

  const mockProductRepository = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidateProductUseCase,
        {
          provide: 'ProductPrismaRepository',
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    validateProductUseCase = module.get<ValidateProductUseCase>(
      ValidateProductUseCase,
    );
  });

  it('should validate and return product when stock is sufficient', async () => {
    const productId = 1;
    const quantity = 5;
    const product = { id: productId, name: 'Product A', stockQuantity: 10 };

    mockProductRepository.findById.mockResolvedValueOnce(product);

    const result = await validateProductUseCase.validate(productId, quantity);

    expect(result).toEqual(product);
    expect(mockProductRepository.findById).toHaveBeenCalledWith(productId);
  });

  it('should throw NotFoundException when product is not found', async () => {
    const productId = 1;
    const quantity = 5;

    mockProductRepository.findById.mockResolvedValueOnce(null);

    await expect(
      validateProductUseCase.validate(productId, quantity),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should throw BadRequestException when quantity is less than stock', async () => {
    const productId = 1;
    const quantity = 15;
    const product = { id: productId, name: 'Product A', stockQuantity: 10 };

    mockProductRepository.findById.mockResolvedValueOnce(product);

    await expect(
      validateProductUseCase.validate(productId, quantity),
    ).rejects.toThrowError(BadRequestException);
  });

  it('should throw BadRequestException when quantity is zero or negative', async () => {
    const productId = 1;
    const quantity = 0;

    await expect(
      validateProductUseCase.validate(productId, quantity),
    ).rejects.toThrowError(BadRequestException);
  });
});
