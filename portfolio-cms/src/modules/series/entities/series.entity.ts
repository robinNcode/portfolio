import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type SeriesDocument = Series & Document;

@Schema({ timestamps: true })
export class Series {
  @Prop({ type: Object, default: { en: '', bn: '' } })
  name: Record<string, string>;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug: string;

  @Prop({ type: Object, default: { en: '', bn: '' } })
  description: Record<string, string>;

  @Prop({ default: null })
  cover_image: string;

  @Prop([
    {
      blog_id: { type: MongooseSchema.Types.ObjectId, ref: 'Blog' },
      order: { type: Number },
    },
  ])
  articles: Record<string, any>[];

  @Prop({ default: false })
  is_published: boolean;
}

export const SeriesSchema = SchemaFactory.createForClass(Series);
