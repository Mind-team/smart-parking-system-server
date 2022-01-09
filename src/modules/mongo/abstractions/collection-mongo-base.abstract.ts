import { Model } from 'mongoose';
import { ICollection } from '../../../infrastructure';

export abstract class CollectionMongoBaseService<T> implements ICollection<T> {
  protected constructor(protected model: Model<any>) {}

  async deleteOne(filter: { [p: string]: any }): Promise<void> {
    await this.model.deleteOne(filter);
  }

  async findById(id: string): Promise<T> | null {
    return this.findOne({ _id: id });
  }

  async findOne(filter: { [p: string]: any }): Promise<T> | null {
    return this.model.findOne(filter);
  }

  async findManyById(ids: string[]): Promise<T[]> | null {
    return this.model.find({ _id: { $in: ids } });
  }

  async save(content: T): Promise<void> {
    await new this.model(content).save();
  }

  async updateOne(filter: { [p: string]: any }, update: T): Promise<void> {
    await this.model.updateOne(filter, update);
  }

  async all(): Promise<T[]> {
    return this.model.find();
  }
}
