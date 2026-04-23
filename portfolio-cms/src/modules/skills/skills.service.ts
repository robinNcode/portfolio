import { Injectable, NotFoundException } from '@nestjs/common';
import { SkillsRepository } from './repositories/skills.repository';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillsService {
  constructor(private readonly skillsRepository: SkillsRepository) {}

  async findAll(): Promise<Skill[]> {
    return this.skillsRepository.findAllOrdered();
  }

  async create(data: Partial<Skill>): Promise<Skill> {
    return this.skillsRepository.create(data);
  }

  async update(id: string, data: Partial<Skill>): Promise<Skill> {
    const updated = await this.skillsRepository.update(id, data);
    if (!updated) throw new NotFoundException('Skill not found');
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.skillsRepository.delete(id);
    if (!deleted) throw new NotFoundException('Skill not found');
  }
}
