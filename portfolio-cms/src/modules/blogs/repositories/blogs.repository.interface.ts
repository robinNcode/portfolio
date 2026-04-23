import { Blog } from '../entities/blog.entity';
import { IBaseRepository } from '../../../common/interfaces/base.repository.interface';

export interface IBlogsRepository extends IBaseRepository<Blog> {
  findBySlug(slug: string): Promise<Blog | null>;
  incrementViewCount(id: string): Promise<void>;
}
