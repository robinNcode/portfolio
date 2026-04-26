import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './entities/blog.entity';
import { Series, SeriesSchema } from '../series/entities/series.entity';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { BlogsRepository } from './repositories/blogs.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blog.name, schema: BlogSchema },
      { name: Series.name, schema: SeriesSchema }
    ]),
  ],
  controllers: [BlogsController],
  providers: [
    BlogsService,
    {
      provide: 'IBlogsRepository',
      useClass: BlogsRepository,
    },
  ],
  exports: [BlogsService],
})
export class BlogsModule {}
