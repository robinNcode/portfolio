import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Media, MediaSchema } from './entities/media.entity';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MediaRepository } from './repositories/media.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }]),
  ],
  controllers: [MediaController],
  providers: [
    MediaService,
    {
      provide: 'IMediaRepository',
      useClass: MediaRepository,
    },
  ],
  exports: [MediaService],
})
export class MediaModule {}
