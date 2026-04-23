import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SkillDocument = Skill & Document;

@Schema({ timestamps: true })
export class Skill {
  @Prop({ required: true, unique: true })
  category: string;

  @Prop({ default: '◈' })
  icon: string;

  @Prop({ default: '#22d3ee' })
  color: string;

  @Prop([String])
  items: string[];

  @Prop({ default: 0 })
  order: number;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
