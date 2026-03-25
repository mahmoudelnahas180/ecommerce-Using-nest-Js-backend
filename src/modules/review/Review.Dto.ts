import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsNumber,
  Min,
  Max,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  reviewText: string;
  @IsNumber()
  @Min(1)
  @Max(5)
  @Type(() => Number)
  rating: number;
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  productId: string;
}
