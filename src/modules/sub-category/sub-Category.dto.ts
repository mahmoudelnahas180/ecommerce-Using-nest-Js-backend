import {
  MaxLength,
  IsString,
  IsMongoId,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
export class CreateSubCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(30, { message: 'Name must be at most 30 characters long' })
  name: string;
  //   add massge for validation
  @IsString({ message: 'CategoryId must be a string' })
  @IsNotEmpty({ message: 'CategoryId is required' })
  @IsMongoId({ message: 'CategoryId must be a valid MongoDB ObjectId' })
  CategoryId: string;
}
