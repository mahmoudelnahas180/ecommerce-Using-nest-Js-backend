import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Category extends Document {
  @Prop({ maxLength: 30, minLength: 3, required: true })
  name: string;
  @Prop()
  image: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.virtual('subCategories', {
  ref: 'SubCategory',
  localField: '_id',
  foreignField: 'categoryId',
});
