import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsNotEmpty,
  Min,
  Max,
  IsNumber,
  IsBoolean,
  Matches,
  IsEnum,
  IsUrl,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';
export class CreateUserDto {
  //name
  @MinLength(3, { message: 'name must be at least 3 characters' })
  @MaxLength(30, { message: 'name must be at most 30 characters' })
  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name must be a string' })
  name: string;
  //email
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'email is invalid' })
  email: string;
  //password
  @IsString({ message: 'password must be a string' })
  // @MinLength(3, { message: 'password must be at least 3 characters' })
  // @MaxLength(20, { message: 'password must be at most 20 characters' })
  password: string;
  //role
  @IsString({ message: 'role must be a string' })
  @IsEnum(['admin', 'user'], { message: 'role must be admin or user' })
  role: string;
  //age
  @IsNumber({}, { message: 'age must be a number' })
  @Min(15, { message: 'age must be at least 15' })
  @Max(80, { message: 'age must be at most 80' })
  age: number;
  //avatar
  @IsString({ message: 'avatar must be a string' })
  @IsUrl({}, { message: 'avatar must be a url' })
  avatar: string;
  //phone number
  @IsString({ message: 'phone number must be a string' })
  @MinLength(11, { message: 'phone number must be at least 11 digits' })
  @MaxLength(11, { message: 'phone number must be at most 11 digits' })
  // @Matches(/^[01]\d{9}$/, {
  //   message: 'phone number must be at least 11 digits',
  // })
  @IsPhoneNumber('EG', {
    message: 'phone number mu st be a valid egyptian phone number',
  })
  phoneNumber: string;
  //address
  @IsString({ message: 'address must be a string' })
  address: string;
  //active
  @IsBoolean({ message: 'active must be a boolean' })
  @IsEnum([false, true], { message: 'active must be true or false' })
  active: boolean;
  //vervaction code
  @IsString({ message: 'vervaction code must be a string' })
  vervactionCode: string;
  //gender
  @IsString({ message: 'gender must be a string' })
  @IsEnum(['male', 'female'], { message: 'gender must be male or female' })
  gender: string;
}
export class SignInDto {
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  password: string;
}
export class UpdateUserDto {
  //name
  @IsOptional()
  @MinLength(3, { message: 'name must be at least 3 characters' })
  @MaxLength(30, { message: 'name must be at most 30 characters' })
  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name must be a string' })
  name: string;
  //email
  @IsOptional()
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'email is invalid' })
  email: string;
  //password
  @IsOptional()
  @IsString({ message: 'password must be a string' })
  // @MinLength(3, { message: 'password must be at least 3 characters' })
  // @MaxLength(20, { message: 'password must be at most 20 characters' })
  password: string;
  //role
  @IsOptional()
  @IsString({ message: 'role must be a string' })
  @IsEnum(['admin', 'user'], { message: 'role must be admin or user' })
  role: string;
  //age
  @IsOptional()
  @IsNumber({}, { message: 'age must be a number' })
  @Min(15, { message: 'age must be at least 15' })
  @Max(80, { message: 'age must be at most 80' })
  age: number;
  //avatar
  @IsOptional()
  @IsString({ message: 'avatar must be a string' })
  @IsUrl({}, { message: 'avatar must be a url' })
  avatar: string;
  //phone number
  @IsOptional()
  @IsString({ message: 'phone number must be a string' })
  @MinLength(11, { message: 'phone number must be at least 11 digits' })
  @MaxLength(11, { message: 'phone number must be at most 11 digits' })
  // @Matches(/^[01]\d{9}$/, {
  //   message: 'phone number must be at least 11 digits',
  // })
  @IsPhoneNumber('EG', {
    message: 'phone number mu st be a valid egyptian phone number',
  })
  phoneNumber: string;
  //address
  @IsOptional()
  @IsString({ message: 'address must be a string' })
  address: string;
  //active
  @IsOptional()
  @IsBoolean({ message: 'active must be a boolean' })
  @IsEnum([false, true], { message: 'active must be true or false' })
  active: boolean;
  //vervaction code
  @IsOptional()
  @IsString({ message: 'vervaction code must be a string' })
  vervactionCode: string;
  //gender
  @IsOptional()
  @IsString({ message: 'gender must be a string' })
  @IsEnum(['male', 'female'], { message: 'gender must be male or female' })
  gender: string;
}
