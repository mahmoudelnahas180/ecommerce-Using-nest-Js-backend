import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Coupon extends Document {
  @Prop({
    type: String,
    required: [true, 'Coupon name is required'],
    trim: true,
    minlength: [2, 'Coupon name is too short'],
    maxlength: [50, 'Coupon name is too long'],
    unique: true,
    uppercase: true,
  })
  name: string;

  @Prop({
    type: Date,
    required: [true, 'Expire date is required'],
  })
  expireDate: Date;

  @Prop({
    type: Number,
    required: [true, 'Discount is required'],
    min: [0, 'Discount must be greater than or equal 0'],
  })
  discount: number;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
