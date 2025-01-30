import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateOrderRequestDto {
  @ApiProperty({ description: 'Status of the order', example: 'COMPLETED' })
  @IsString()
  status?: string;
}
