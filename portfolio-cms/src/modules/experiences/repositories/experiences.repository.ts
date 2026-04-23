import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Experience, ExperienceDocument } from '../entities/experience.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class ExperiencesRepository extends BaseRepository<Experience> {
  constructor(
    @InjectModel(Experience.name) experienceModel: Model<ExperienceDocument>,
  ) {
    super(experienceModel);
  }

  async findAllOrdered(): Promise<Experience[]> {
    return this.model.find().sort({ order: 1 }).exec() as any;
  }
}
