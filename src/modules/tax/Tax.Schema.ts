import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
@Schema({ timestamps: true })
export class Tax extends Document {
  @Prop({ type: Number })
  texPrice: number;
  @Prop({ type: Number })
  shippingPrice: number;
}

export const TaxSchema = SchemaFactory.createForClass(Tax);
