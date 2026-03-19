import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Brand extends Document {
  @Prop({
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    trim: true,
  })
  name: string;

  @Prop({ type: String })
  logo: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
