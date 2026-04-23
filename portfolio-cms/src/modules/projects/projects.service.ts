import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { ProjectsRepository } from './repositories/projects.repository';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.findAll();
  }

  async create(data: Partial<Project>): Promise<Project> {
    return this.projectsRepository.create(data);
  }

  async update(id: string, data: Partial<Project>): Promise<Project> {
    const updated = await this.projectsRepository.update(id, data);
    if (!updated) {
      throw new NotFoundException('Project not found');
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.projectsRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Project not found');
    }
  }
}
