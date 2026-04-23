import { Injectable, NotFoundException } from '@nestjs/common';
import { ExperiencesRepository } from './repositories/experiences.repository';
import { Experience } from './entities/experience.entity';

@Injectable()
export class ExperiencesService {
  constructor(private readonly experiencesRepository: ExperiencesRepository) {}

  async findAll(): Promise<Experience[]> {
    return this.experiencesRepository.findAllOrdered();
  }

  async create(data: Partial<Experience>): Promise<Experience> {
    return this.experiencesRepository.create(data);
  }

  async update(id: string, data: Partial<Experience>): Promise<Experience> {
    const updated = await this.experiencesRepository.update(id, data);
    if (!updated) throw new NotFoundException('Experience not found');
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.experiencesRepository.delete(id);
    if (!deleted) throw new NotFoundException('Experience not found');
  }
}
