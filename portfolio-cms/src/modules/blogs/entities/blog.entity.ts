import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema({ _id: false })
class LocalizedField {
  @Prop({ default: '' })
  en: string;

  @Prop({ default: '' })
  bn: string;
}

const LocalizedFieldSchema = SchemaFactory.createForClass(LocalizedField);

@Schema({ timestamps: true })
export class Blog {
  @Prop({ type: LocalizedFieldSchema })
  title: LocalizedField;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug: string;

  @Prop({ default: '' })
  content: string;

  @Prop({ default: '' })
  excerpt: string;

  @Prop({ enum: ['en', 'bn', 'both'], default: 'en' })
  language: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Series', default: null })
  series_id: MongooseSchema.Types.ObjectId;

  @Prop({ default: null })
  series_order: number;

  @Prop([String])
  tags: string[];

  @Prop({ default: null })
  cover_image: string;

  @Prop({ default: false })
  is_published: boolean;

  @Prop({ default: null })
  published_at: Date;

  @Prop({ default: 0 })
  read_time: number;

  @Prop({ default: 0 })
  view_count: number;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

BlogSchema.index(
  { 'title.en': 'text', 'title.bn': 'text', tags: 'text', excerpt: 'text' },
  { language_override: 'dummy_language' },
);
BlogSchema.index({ is_published: 1, published_at: -1 });
BlogSchema.index({ series_id: 1, series_order: 1 });
BlogSchema.index({ language: 1 });
