import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderSchema, Order } from './Schema/Order.Schema';
import { AuthModule } from '../auth/auth.module';
import { Product, ProductSchema } from '../product/product.Schema';
import { Cart, CartSchema } from '../cart/Cart.Schema';
import { User, UserSchema } from '../auth/User.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Cart.name, schema: CartSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
