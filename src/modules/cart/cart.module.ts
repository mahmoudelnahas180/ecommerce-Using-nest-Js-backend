import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CartSchema, Cart } from './Cart.Schema';
import { ProductModule } from '../product/product.module';
import { AuthModule } from '../auth/auth.module';
import { Coupon, CouponSchema } from '../coupon/coupon.Schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: Coupon.name, schema: CouponSchema },
    ]),
    ProductModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
