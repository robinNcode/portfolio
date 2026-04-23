import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type SeriesDocument = Series & Document;

@Schema({ _id: false })
class LocalizedField {
  @Prop({ default: '' })
  en: string;

  @Prop({ default: '' })
  bn: string;
}

const LocalizedFieldSchema = SchemaFactory.createForClass(LocalizedField);

@Schema({ _id: false })
class ArticleItem {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Blog' })
  blog_id: MongooseSchema.Types.ObjectId;

  @Prop()
  order: number;
}

const ArticleItemSchema = SchemaFactory.createForClass(ArticleItem);

@Schema({ timestamps: true })
export class Series {
  @Prop({ type: LocalizedFieldSchema })
  name: LocalizedField;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  slug: string;

  @Prop({ type: LocalizedFieldSchema })
  description: LocalizedField;

  @Prop({ default: null })
  cover_image: string;

  @Prop({ type: [ArticleItemSchema] })
  articles: ArticleItem[];

  @Prop({ default: false })
  is_published: boolean;
}

export const SeriesSchema = SchemaFactory.createForClass(Series);
