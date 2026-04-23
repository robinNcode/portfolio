import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ enum: ['admin'], default: 'admin' })
  role: string;

  @Prop({ default: 'Admin' })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  
  const salt = await bcrypt.genSalt(12);
  // @ts-ignore
  this.password = await bcrypt.hash(this.password, salt);
});

(UserSchema.methods as any).comparePassword = function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, (this as any).password);
};

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete (ret as any).password;
    return ret;
  },
});
