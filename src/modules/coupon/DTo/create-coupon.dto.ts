import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  expireDate: Date;

  @IsNumber()
  @Min(0)
  discount: number;
}
