import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShippingPrice, ShippingPriceSchema } from './shipping-price.schema';
import { ShippingPriceController } from './shipping-price.controller';
import { ShippingPriceService } from './shipping-price.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: ShippingPrice.name, schema: ShippingPriceSchema },
    ]),
  ],
  controllers: [ShippingPriceController],
  providers: [ShippingPriceService],
})
export class ShippingPriceModule {}
