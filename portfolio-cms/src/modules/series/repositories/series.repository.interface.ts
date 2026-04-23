import { Series } from '../entities/series.entity';
import { IBaseRepository } from '../../../common/interfaces/base.repository.interface';

export interface ISeriesRepository extends IBaseRepository<Series> {
  findBySlug(slug: string): Promise<Series | null>;
}
