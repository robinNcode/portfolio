import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Media, MediaDocument } from '../entities/media.entity';
import { BaseRepository } from '../../../common/repositories/base.repository';
import { IMediaRepository } from './media.repository.interface';

@Injectable()
export class MediaRepository extends BaseRepository<Media> implements IMediaRepository {
  constructor(
    @InjectModel(Media.name) private readonly mediaModel: Model<MediaDocument>,
  ) {
    super(mediaModel);
  }
}
