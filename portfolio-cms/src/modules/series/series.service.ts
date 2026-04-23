import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { ISeriesRepository } from './repositories/series.repository.interface';
import { Series } from './entities/series.entity';

@Injectable()
export class SeriesService {
  constructor(
    @Inject('ISeriesRepository')
    private readonly seriesRepository: ISeriesRepository,
  ) {}

  async findAll(): Promise<Series[]> {
    return this.seriesRepository.findAll();
  }

  async findBySlug(slug: string): Promise<Series> {
    const series = await this.seriesRepository.findBySlug(slug);
    if (!series) {
      throw new NotFoundException('Series not found');
    }
    return series;
  }

  async getSeriesById(id: string): Promise<Series> {
    const series = await this.seriesRepository.findById(id);
    if (!series) {
      throw new NotFoundException('Series not found');
    }
    return series;
  }

  async create(data: Partial<Series>): Promise<Series> {
    return this.seriesRepository.create(data);
  }

  async update(id: string, data: Partial<Series>): Promise<Series> {
    const updated = await this.seriesRepository.update(id, data);
    if (!updated) {
      throw new NotFoundException('Series not found');
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.seriesRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Series not found');
    }
  }
}
