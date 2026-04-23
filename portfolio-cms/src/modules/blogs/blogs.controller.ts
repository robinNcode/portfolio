import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BlogsService } from './blogs.service';
import { Blog } from './entities/blog.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('blogs')
@Controller()
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get('blogs')
  @ApiOperation({ summary: 'Get all blogs public' })
  async findAll(): Promise<Blog[]> {
    return this.blogsService.findAll();
  }

  @Get('blogs/:slug')
  @ApiOperation({ summary: 'Get blog by slug (public)' })
  async findBySlug(@Param('slug') slug: string): Promise<Blog> {
    return this.blogsService.findBySlug(slug);
  }

  @Get('admin/blogs')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all blogs (Admin)' })
  async listAdminBlogs(): Promise<Blog[]> {
    return this.blogsService.findAll();
  }

  @Post('admin/blog')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create blog (Admin only)' })
  async create(@Body() data: Partial<Blog>): Promise<Blog> {
    return this.blogsService.create(data);
  }

  @Put('admin/blog/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update blog (Admin only)' })
  async update(@Param('id') id: string, @Body() data: Partial<Blog>): Promise<Blog> {
    return this.blogsService.update(id, data);
  }

  @Put('admin/blog/:id/publish')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Toggle blog publish status (Admin only)' })
  async togglePublish(@Param('id') id: string, @Body() data: { is_published: boolean }): Promise<Blog> {
    return this.blogsService.update(id, { is_published: data.is_published } as any);
  }

  @Delete('admin/blog/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete blog (Admin only)' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.blogsService.delete(id);
  }
}
