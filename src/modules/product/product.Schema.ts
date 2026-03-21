import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  })
  title: string;
  @Prop({ type: String, minlength: 20, trim: true, required: true })
  description: string;
  @Prop({ type: Number, default: 0, required: true })
  quantity: number;
  @Prop({ type: String, required: true })
  ImageCover: string;
  @Prop({ type: [String] })
  images: string[];
  @Prop({ type: Number, default: 0 })
  sold: number;
  @Prop({ type: Number, required: true })
  price: number;
  @Prop({ type: Number })
  priceAfterDiscount: number;
  @Prop({ type: [String] })
  color: string[];
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: mongoose.Types.ObjectId;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
    // required: true,
  })
  subCategory: mongoose.Types.ObjectId;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true,
  })
  brand: mongoose.Types.ObjectId;
  @Prop({ type: Number, default: 0 })
  ratingsAverage: number;
  @Prop({ type: Number, default: 0 })
  ratingsQuantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
