import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

class CartItemDto {
  @IsMongoId({ message: 'Invalid product ID format' })
  productId: string;

  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  @Type(() => Number)
  quantity: number;

  @IsOptional()
  @IsString()
  color?: string;
}

class CouponDto {
  @IsString()
  name: string;

  @IsMongoId({ message: 'Invalid coupon ID format' })
  couponId: string;
}

export class CashOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  CartItems: CartItemDto[];

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  totalPrice: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  totalPriceAfterDiscount?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CouponDto)
  coupons?: CouponDto[];

  @IsOptional()
  @IsMongoId({ message: 'Invalid shipping address ID format' })
  shipingAddress?: string;
}
