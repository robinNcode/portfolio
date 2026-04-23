import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExperienceDocument = Experience & Document;

@Schema({ timestamps: true })
export class Experience {
  @Prop({ required: true, unique: true })
  exp_id: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  period: string;

  @Prop({ default: '' })
  duration: string;

  @Prop({ default: '' })
  location: string;

  @Prop({ default: null })
  product: string;

  @Prop({ default: null })
  product_url: string;

  @Prop({ default: null })
  process: string;

  @Prop({ enum: ['active', 'completed'], default: 'completed' })
  status: string;

  @Prop({ default: '' })
  tagline: string;

  @Prop({ default: '' })
  problem_solved: string;

  @Prop([String])
  impact: string[];

  @Prop([String])
  leadership: string[];

  @Prop([String])
  stack: string[];

  @Prop({ default: null })
  award: string;

  @Prop({ default: 0 })
  order: number;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);
