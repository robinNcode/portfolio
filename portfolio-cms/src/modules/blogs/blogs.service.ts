import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { IBlogsRepository } from './repositories/blogs.repository.interface';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogsService {
  constructor(
    @Inject('IBlogsRepository')
    private readonly blogsRepository: IBlogsRepository,
  ) {}

  async findAll(): Promise<Blog[]> {
    return this.blogsRepository.findAll();
  }

  async findBySlug(slug: string): Promise<Blog> {
    const blog = await this.blogsRepository.findBySlug(slug);
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    return blog;
  }

  async create(data: Partial<Blog>): Promise<Blog> {
    return this.blogsRepository.create(data);
  }

  async update(id: string, data: Partial<Blog>): Promise<Blog> {
    const updated = await this.blogsRepository.update(id, data);
    if (!updated) {
      throw new NotFoundException('Blog not found');
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.blogsRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Blog not found');
    }
  }
}
