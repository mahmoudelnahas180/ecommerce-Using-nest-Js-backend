import {
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddToCartDto {
  @IsMongoId({ message: 'Invalid product ID format' })
  productId: string;

  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  @Type(() => Number)
  quantity: number;

  @IsOptional()
  @IsString()
  color?: string;
}
