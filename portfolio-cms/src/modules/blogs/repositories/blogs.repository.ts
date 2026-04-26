import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from '../entities/blog.entity';
import { IBlogsRepository } from './blogs.repository.interface';

@Injectable()
export class BlogsRepository implements IBlogsRepository {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
  ) {}

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().populate('series_id').exec();
  }

  async findById(id: string): Promise<Blog | null> {
    return this.blogModel.findById(id).populate('series_id').exec();
  }

  async findOne(filter: object): Promise<Blog | null> {
    return this.blogModel.findOne(filter).populate('series_id').exec();
  }

  async findBySlug(slug: string): Promise<Blog | null> {
    return this.blogModel.findOne({ slug }).populate('series_id').exec();
  }

  async create(data: Partial<Blog>): Promise<Blog> {
    const newBlog = new this.blogModel(data);
    return newBlog.save();
  }

  async update(id: string, data: Partial<Blog>): Promise<Blog | null> {
    return this.blogModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.blogModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }

  async incrementViewCount(id: string): Promise<void> {
    await this.blogModel.findByIdAndUpdate(id, { $inc: { view_count: 1 } }).exec();
  }
}
