import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SeriesService } from './series.service';
import { Series } from './entities/series.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('series')
@Controller()
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Get('series')
  @ApiOperation({ summary: 'Get all public series' })
  async listSeries() {
    return this.seriesService.findAll();
  }

  @Get('series/slug/:slug')
  @ApiOperation({ summary: 'Get series by slug (public)' })
  async getSeriesBySlug(@Param('slug') slug: string) {
    return this.seriesService.findBySlug(slug);
  }

  @Get('series/:id')
  @ApiOperation({ summary: 'Get series by ID (public)' })
  async getSeries(@Param('id') id: string) {
    return this.seriesService.getSeriesById(id);
  }

  @Get('admin/series')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all series (Admin)' })
  async listAdminSeries() {
    return this.seriesService.findAll(); // Assuming no pagination applied for simple migration since it returns array
  }

  @Post('admin/series')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create series (Admin only)' })
  async createSeries(@Body() data: Partial<Series>) {
    return this.seriesService.create(data);
  }

  @Put('admin/series/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update series (Admin only)' })
  async updateSeries(@Param('id') id: string, @Body() data: Partial<Series>) {
    return this.seriesService.update(id, data);
  }

  @Delete('admin/series/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete series (Admin only)' })
  async deleteSeries(@Param('id') id: string) {
    return this.seriesService.delete(id);
  }
}
