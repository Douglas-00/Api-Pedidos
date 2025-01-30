import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsInt,
  Min,
  IsNumber,
} from 'class-validator';

export class CreateProductRequestDto {
  @ApiProperty({ description: 'Nome do produto', example: 'Notebook' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @ApiProperty({ description: 'Categoria do produto', example: 'Eletrônicos' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'Descrição do produto',
    example: 'Notebook Gamer 16GB RAM',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Preço do produto em centavos', example: 500000 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Quantidade em estoque', example: 10 })
  @IsInt()
  @Min(0)
  stockQuantity: number;
}
