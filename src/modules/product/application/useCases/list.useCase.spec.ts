import { Test, TestingModule } from '@nestjs/testing';
import { ListProductUseCase } from './list.useCase';
import { ProductMapper } from '../mappers/product.mapper';

describe('ListProductUseCase', () => {
  let listProductUseCase: ListProductUseCase;

  const mockProductRepository = {
    list: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListProductUseCase,
        {
          provide: 'ProductPrismaRepository',
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    listProductUseCase = module.get<ListProductUseCase>(ListProductUseCase);
  });

  it('should list products successfully', async () => {
    const products = [
      {
        id: 1,
        name: 'Product A',
        description: 'Desc A',
        price: 50,
        stockQuantity: 5,
      },
      {
        id: 2,
        name: 'Product B',
        description: 'Desc B',
        price: 70,
        stockQuantity: 10,
      },
    ];

    mockProductRepository.list.mockResolvedValueOnce(products);
    jest
      .spyOn(ProductMapper, 'toListResponseDto')
      .mockReturnValueOnce(products);

    const result = await listProductUseCase.execute();

    expect(result).toEqual(products);
    expect(mockProductRepository.list).toHaveBeenCalledTimes(1);
  });
});
