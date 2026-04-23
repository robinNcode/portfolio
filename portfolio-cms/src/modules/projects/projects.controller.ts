import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('projects')
@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('projects')
  @ApiOperation({ summary: 'List all public projects' })
  async listProjects() {
    return this.projectsService.findAll();
  }

  @Post('admin/project')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a project' })
  async createProject(@Body() data: Partial<Project>) {
    return this.projectsService.create(data);
  }

  @Put('admin/project/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a project' })
  async updateProject(@Param('id') id: string, @Body() data: Partial<Project>) {
    return this.projectsService.update(id, data);
  }

  @Delete('admin/project/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a project' })
  async deleteProject(@Param('id') id: string) {
    return this.projectsService.delete(id);
  }
}
