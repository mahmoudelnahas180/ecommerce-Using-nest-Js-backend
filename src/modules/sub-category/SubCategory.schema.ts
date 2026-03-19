import mongoose, { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Category } from '../category/Category.Schema';
@Schema({ timestamps: true })
export class SubCategory extends Document {
  @Prop({ required: true, maxLength: 30, minLength: 3, unique: true })
  name: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  categoryId: mongoose.Types.ObjectId;
}
export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
