import { IsString } from 'class-validator';
export class ApplyCouponDto {
  @IsString()
  couponName: string;
}
