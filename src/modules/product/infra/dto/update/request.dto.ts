import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, MaxLength, Min } from 'class-validator';

export class UpdateProductRequestDto {
  @ApiProperty({ description: 'Nome do produto', example: 'Notebook' })
  @IsString()
  @MaxLength(150)
  name?: string;

  @ApiProperty({ description: 'Categoria do produto', example: 'Eletrônicos' })
  @IsString()
  category?: string;

  @ApiProperty({
    description: 'Descrição do produto',
    example: 'Notebook Gamer 16GB RAM',
  })
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Preço do produto em centavos', example: 500000 })
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({ description: 'Quantidade em estoque', example: 10 })
  @IsInt()
  @Min(0)
  stockQuantity?: number;
}
