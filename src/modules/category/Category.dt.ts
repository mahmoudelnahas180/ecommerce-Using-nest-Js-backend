import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MaxLength,
  MinLength,
  IsMongoId,
} from 'class-validator';

export class createCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  name: string;
  @IsOptional()
  @IsString()
  @IsUrl()
  image?: string;
}
export class updateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  name: string;
  @IsOptional()
  @IsString()
  @IsUrl()
  image?: string;
}
export class CheckIDDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
