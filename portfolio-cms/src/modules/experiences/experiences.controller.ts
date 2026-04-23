import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ExperiencesService } from './experiences.service';
import { Experience } from './entities/experience.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('experience')
@Controller()
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Get('experience')
  @ApiOperation({ summary: 'List all public experience' })
  async listExperience() {
    return this.experiencesService.findAll();
  }

  @Post('admin/experience')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create an experience' })
  async createExperience(@Body() data: Partial<Experience>) {
    return this.experiencesService.create(data);
  }

  @Put('admin/experience/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an experience' })
  async updateExperience(@Param('id') id: string, @Body() data: Partial<Experience>) {
    return this.experiencesService.update(id, data);
  }

  @Delete('admin/experience/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an experience' })
  async deleteExperience(@Param('id') id: string) {
    return this.experiencesService.delete(id);
  }
}
