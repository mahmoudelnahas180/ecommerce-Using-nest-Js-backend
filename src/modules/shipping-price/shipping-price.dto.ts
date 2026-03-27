import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateShippingPriceDto {
  @IsString({ message: 'Region must be a string' })
  @IsNotEmpty({ message: 'Region is required' })
  @MinLength(2, { message: 'Region is too short' })
  readonly region: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be greater than 0' })
  readonly price: number;
}

export class UpdateShippingPriceDto {
  @IsOptional()
  @IsString({ message: 'Region must be a string' })
  @IsNotEmpty({ message: 'Region cannot be empty' })
  @MinLength(2, { message: 'Region is too short' })
  readonly region?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be greater than 0' })
  readonly price?: number;
}

export class ShippingPriceIdDto {
  @IsString({ message: 'ID must be a string' })
  @IsNotEmpty({ message: 'ID is required' })
  @IsMongoId({ message: 'Invalid ID format' })
  readonly id: string;
}
