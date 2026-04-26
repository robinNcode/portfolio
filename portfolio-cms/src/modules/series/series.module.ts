import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Series, SeriesSchema } from './entities/series.entity';
import { Blog, BlogSchema } from '../blogs/entities/blog.entity';
import { SeriesRepository } from './repositories/series.repository';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Series.name, schema: SeriesSchema },
      { name: Blog.name, schema: BlogSchema }
    ]),
  ],
  controllers: [SeriesController],
  providers: [
    SeriesService,
    {
      provide: 'ISeriesRepository',
      useClass: SeriesRepository,
    },
  ],
  exports: [SeriesService],
})
export class SeriesModule {}
