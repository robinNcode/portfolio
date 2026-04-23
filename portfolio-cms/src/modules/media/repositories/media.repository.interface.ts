import { Media } from '../entities/media.entity';
import { IBaseRepository } from '../../../common/interfaces/base.repository.interface';

export interface IMediaRepository extends IBaseRepository<Media> {
  // Add any media-specific methods if needed
}
