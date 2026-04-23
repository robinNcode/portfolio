import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true, unique: true })
  project_id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ default: 'Production' })
  status: string;

  @Prop({ default: '' })
  problem: string;

  @Prop({ default: '' })
  solution: string;

  @Prop({ default: '' })
  impact: string;

  @Prop([String])
  stack: string[];

  @Prop({ default: '' })
  architecture: string;

  @Prop({ default: 'from-cyan-900/30 to-blue-900/20' })
  gradient: string;

  @Prop({ default: '#22d3ee' })
  accent: string;

  @Prop({ default: null })
  github_url: string;

  @Prop({ default: null })
  live_url: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: true })
  is_published: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
