import { Module } from '@nestjs/common';
import { ShipingController } from './shiping.controller';

@Module({
  controllers: [ShipingController]
})
export class ShipingModule {}
