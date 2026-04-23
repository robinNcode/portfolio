import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Experience, ExperienceSchema } from './entities/experience.entity';
import { ExperiencesRepository } from './repositories/experiences.repository';
import { ExperiencesService } from './experiences.service';
import { ExperiencesController } from './experiences.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Experience.name, schema: ExperienceSchema }]),
  ],
  controllers: [ExperiencesController],
  providers: [ExperiencesService, ExperiencesRepository],
  exports: [ExperiencesService],
})
export class ExperiencesModule {}
