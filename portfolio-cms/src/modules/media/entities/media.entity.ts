import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type MediaDocument = Media & Document;

@Schema({ timestamps: true })
export class Media {
  @Prop({ required: true })
  file_name: string;

  @Prop({ required: true })
  original_name: string;

  @Prop({ required: true })
  url: string;

  @Prop({ default: '' })
  alt_text: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  mime_type: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  uploaded_by: MongooseSchema.Types.ObjectId;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
