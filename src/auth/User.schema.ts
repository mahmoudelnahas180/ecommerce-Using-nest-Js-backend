import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class User extends Document {
  @Prop({
    min: [3, 'name must be at least 3 characters'],
    maxlength: [30, 'name must be at most 30 characters'],
  })
  name: string;
  @Prop({ unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
  email: string;
  @Prop({
    min: [3, 'password must be at least 3 characters'],
    maxlength: [20, 'password must be at most 20 characters'],
  })
  password: string;
  @Prop({ enum: ['admin', 'user'], default: 'user' })
  role: string;
  @Prop({
    min: [15, 'age must be at least 15'],
    max: [80, 'age must be at most 80'],
  })
  age: number;
  @Prop()
  avatar: string;
  @Prop({
    min: [11, 'phone number must be at least 11 digits'],
    max: [11, 'phone number must be at most 11 digits'],
    match: [/^[01]\d{9}$/, 'phone number must be at least 11 digits'],
  })
  phoneNumber: string;
  @Prop()
  address: string;
  @Prop({ enum: [false, true] })
  active: boolean;
  @Prop()
  vervactionCode: string;
  @Prop({ enum: ['male', 'female'] })
  gender: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
