import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from '../entities/project.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class ProjectsRepository extends BaseRepository<Project> {
  constructor(
    @InjectModel(Project.name) projectModel: Model<ProjectDocument>,
  ) {
    super(projectModel);
  }
}
