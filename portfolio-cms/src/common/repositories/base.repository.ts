import { Model, Document } from 'mongoose';
import { IBaseRepository } from '../interfaces/base.repository.interface';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  protected constructor(protected readonly model: Model<T & Document>) {}

  async findAll(): Promise<T[]> {
    return this.model.find().exec() as any;
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec() as any;
  }

  async findOne(filter: object): Promise<T | null> {
    return this.model.findOne(filter).exec() as any;
  }

  async create(data: Partial<T>): Promise<T> {
    const created = new this.model(data);
    return (await created.save()) as any;
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data as any, { new: true }).exec() as any;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.deleteOne({ _id: id } as any).exec();
    return result.deletedCount > 0;
  }
}
