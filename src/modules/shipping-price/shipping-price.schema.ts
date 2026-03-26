import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ShippingPrice extends Document {
  @Prop({ required: true, unique: true, trim: true })
  region: string;

  @Prop({ required: true })
  price: number;
}

export const ShippingPriceSchema = SchemaFactory.createForClass(ShippingPrice);
