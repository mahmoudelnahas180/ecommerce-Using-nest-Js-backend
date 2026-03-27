import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './modules/category/category.module';
import { SubCategoryModule } from './modules/sub-category/sub-category.module';
import { ProductModule } from './modules/product/product.module';
// import { ProductController } from './modules/product/product.controller';
import { BrandModule } from './modules/brand/brand.module';
import { ReviewModule } from './modules/review/review.module';
import { CartModule } from './modules/cart/cart.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { OrderModule } from './modules/order/order.module';
import { TaxModule } from './modules/tax/tax.module';
import { ShipingModule } from './modules/shiping/shiping.module';
import { ShippingPriceModule } from './modules/shipping-price/shipping-price.module';
// sss

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URL || 'mongodb://localhost:27017/ecommerce',
      }),
    }),
    UsersModule,
    AuthModule,
    CategoryModule,
    SubCategoryModule,
    ProductModule,
    BrandModule,
    ReviewModule,
    CartModule,
    CouponModule,
    OrderModule,
    TaxModule,
    ShipingModule,
    ShippingPriceModule,
  ],
  controllers: [],
})
export class AppModule {}
