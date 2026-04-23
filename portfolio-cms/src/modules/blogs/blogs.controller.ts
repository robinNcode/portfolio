import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BlogsService } from './blogs.service';
import { Blog } from './entities/blog.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all blogs' })
  async findAll(): Promise<Blog[]> {
    return this.blogsService.findAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get blog by slug' })
  async findBySlug(@Param('slug') slug: string): Promise<Blog> {
    return this.blogsService.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create blog (Admin only)' })
  async create(@Body() data: Partial<Blog>): Promise<Blog> {
    return this.blogsService.create(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update blog (Admin only)' })
  async update(@Param('id') id: string, @Body() data: Partial<Blog>): Promise<Blog> {
    return this.blogsService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete blog (Admin only)' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.blogsService.delete(id);
  }
}
