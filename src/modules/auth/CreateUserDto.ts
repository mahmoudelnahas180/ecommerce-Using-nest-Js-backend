import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  password: string;
}
export class SignUpDto {
  @MinLength(3, { message: 'name must be at least 3 characters' })
  @MaxLength(30, { message: 'name must be at most 30 characters' })
  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name must be a string' })
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  password: string;
  @IsString()
  @MinLength(3)
  confirmPassword: string;
}
