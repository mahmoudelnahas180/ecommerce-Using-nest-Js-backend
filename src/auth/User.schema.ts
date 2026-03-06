import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  name: string;
  @Prop({ unique: true })
  email: string;
  @Prop()
  password: string;
  @Prop({ enum: ['admin', 'user'], default: 'user' })
  role: string;
  @Prop()
  age: number;
}
export const UserSchema = SchemaFactory.createForClass(User);
