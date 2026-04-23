import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill, SkillDocument } from '../entities/skill.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class SkillsRepository extends BaseRepository<Skill> {
  constructor(
    @InjectModel(Skill.name) skillModel: Model<SkillDocument>,
  ) {
    super(skillModel);
  }

  async findAllOrdered(): Promise<Skill[]> {
    return this.model.find().sort({ order: 1 }).exec() as any;
  }
}
