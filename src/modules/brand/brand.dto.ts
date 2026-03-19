import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsMongoId,
} from 'class-validator';

export class CreateBrandDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(3, { message: 'Brand name is too short (minimum 3 characters)' })
  @MaxLength(100, {
    message: 'Brand name is too long (maximum 100 characters)',
  })
  @IsNotEmpty()
  readonly name: string;

  @IsString({ message: 'Logo path must be a string' })
  @IsNotEmpty({ message: 'Logo is required' })
  readonly logo: string;
}
export class CheckIDDto {
  @IsString({ message: 'ID must be a string' })
  @IsNotEmpty({ message: 'ID is required' })
  @IsMongoId({ message: 'Invalid ID format' })
  readonly id: string;
}
