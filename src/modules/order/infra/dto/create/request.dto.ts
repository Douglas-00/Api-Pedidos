import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  Min,
  ValidateNested,
} from 'class-validator';

interface Product {
  productId: number;
  quantity: number;
}

export class CreateOrderRequestDto {
  @ApiProperty({
    description: 'Total amount of the order in cents',
    example: 15000,
  })
  @IsInt()
  @Min(0)
  totalAmount: number;

  @ApiProperty({
    description: 'List of products with quantity',
    example: [{ productId: 1, quantity: 2 }],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  products: Product[];
}
