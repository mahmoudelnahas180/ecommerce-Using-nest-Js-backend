import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Cart extends Document {
  @Prop({
    type: [
      {
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
        price: {
          type: Number,
          required: true,
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
    productId: Types.ObjectId;
    quantity: number;
    price: number;
    color?: string;
  }[];

  @Prop({ type: Number, default: 0 })
  totalPrice: number;

  @Prop({ type: Number, default: 0 })
  totalPriceAfterDiscount: number;

  @Prop({
    type: {
      name: { type: String, required: true },
      couponId: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Coupon',
        required: true,
      },
    },

    default: null,
  })
  coupons: {
    name: string;
    couponId: Types.ObjectId;
  };

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  })
  user: Types.ObjectId;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
