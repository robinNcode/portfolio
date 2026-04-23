import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import type { IMediaRepository } from './repositories/media.repository.interface';
import { Media } from './entities/media.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MediaService {
  constructor(
    @Inject('IMediaRepository')
    private readonly mediaRepository: IMediaRepository,
    private readonly configService: ConfigService,
  ) {}

  async saveMedia(file: Express.Multer.File, altText: string, userId: string): Promise<Media> {
    const url = `/uploads/${file.filename}`;
    return this.mediaRepository.create({
      file_name: file.filename,
      original_name: file.originalname,
      url,
      alt_text: altText || '',
      size: file.size,
      mime_type: file.mimetype,
      uploaded_by: userId as any,
    });
  }

  async findAll(): Promise<Media[]> {
    return this.mediaRepository.findAll();
  }

  async deleteMedia(id: string): Promise<void> {
    const media = await this.mediaRepository.findById(id);
    if (!media) {
      throw new NotFoundException('Media not found');
    }

    const uploadDir = this.configService.get<string>('upload.dir') || 'uploads';
    const filePath = path.join(process.cwd(), uploadDir, media.file_name);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await this.mediaRepository.delete(id);
  }
}
