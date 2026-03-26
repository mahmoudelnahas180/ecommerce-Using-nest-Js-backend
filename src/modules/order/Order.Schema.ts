import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../auth/User.schema';
@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true,
    unique: true,
  })
  userId: Types.ObjectId;

  @Prop({
    type: [
      {
        _id: {
          type: MongooseSchema.Types.ObjectId,
          auto: true,
        },
        productId: {
          type: MongooseSchema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: [1, 'quantity must be at least 1'],
        },

        color: {
          type: String,
          default: '',
        },
      },
    ],
    default: [],
  })
  CartItems: {
    _id?: Types.ObjectId;
    productId: Types.ObjectId;
    quantity: number;

    color?: string;
  }[];

  @Prop({ type: Number, default: 0 })
  totalPrice: number;

  @Prop({ type: Number, default: 0 })
  totalPriceAfterDiscount: number;

  @Prop({
    type: [
      {
        name: { type: String, required: true },
        couponId: {
          type: MongooseSchema.Types.ObjectId,
          ref: 'Coupon',
          required: true,
        },
      },
    ],
    default: [],
  })
  coupons: [
    {
      name: string;
      couponId: Types.ObjectId;
    },
  ];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
