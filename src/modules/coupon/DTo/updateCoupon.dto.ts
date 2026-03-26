import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateCouponDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  expireDate?: Date;
  @IsOptional()
  @IsNumber()
  discount?: number;
}
