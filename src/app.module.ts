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
  ],
  controllers: [],
})
export class AppModule {}
