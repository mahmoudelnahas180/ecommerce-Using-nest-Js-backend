import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsNumber,
  Min,
  Max,
  IsOptional,
  IsArray,
  IsMongoId,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Title is too short (min 3 characters)' })
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(20, { message: 'Description must be at least 20 characters' })
  readonly description: string;

  @IsNumber()
  @Min(1)
  @Max(500)
  @Type(() => Number)
  readonly quantity: number;

  @IsString()
  @IsNotEmpty()
  @IsUrl({}, { message: 'Image Cover must be a valid URL' })
  readonly ImageCover: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly images?: string[];

  @IsNumber()
  @IsOptional()
  @Min(0)
  readonly sold?: number;

  @IsNumber()
  @Min(1)
  @Max(20000)
  @Type(() => Number)
  readonly price: number;

  @IsNumber()
  @IsOptional()
  @Max(20000)
  @Type(() => Number)
  readonly priceAfterDiscount?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  readonly color?: string[];

  @IsMongoId({ message: 'Invalid Category ID format' })
  @IsNotEmpty()
  readonly category: string;

  @IsMongoId({ message: 'Invalid SubCategory ID format' })
  @IsNotEmpty()
  readonly subCategory: string;

  @IsMongoId({ message: 'Invalid Brand ID format' })
  @IsNotEmpty()
  readonly brand: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(5)
  readonly ratingsAverage?: number;

  @IsNumber()
  @IsOptional()
  readonly ratingsQuantity?: number;
}
