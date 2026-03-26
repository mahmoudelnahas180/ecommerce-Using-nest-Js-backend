import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
@Schema({ timestamps: true })
export class Review extends Document {
  @Prop({
    type: String,
    minlength: 3,
    trim: true,
  })
  reviewText: string;
  @Prop({ type: Number, min: 1, max: 5, required: true })
  rating: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: mongoose.Types.ObjectId;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  productId: mongoose.Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
