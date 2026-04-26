import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Series, SeriesDocument } from '../entities/series.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { ISeriesRepository } from './series.repository.interface';

@Injectable()
export class SeriesRepository extends BaseRepository<Series> implements ISeriesRepository {
  constructor(
    @InjectModel(Series.name) private readonly seriesModel: Model<SeriesDocument>,
  ) {
    super(seriesModel);
  }

  async findBySlug(slug: string): Promise<Series | null> {
    return this.model.findOne({ slug }).populate('articles.blog_id').lean().exec() as any;
  }

  async findById(id: string): Promise<Series | null> {
    return this.model.findById(id).populate('articles.blog_id').lean().exec() as any;
  }
}
