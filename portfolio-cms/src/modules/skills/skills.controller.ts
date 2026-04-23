import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SkillsService } from './skills.service';
import { Skill } from './entities/skill.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('skills')
@Controller()
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get('skills')
  @ApiOperation({ summary: 'List all public skills' })
  async listSkills() {
    return this.skillsService.findAll();
  }

  @Post('admin/skill')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a skill' })
  async createSkill(@Body() data: Partial<Skill>) {
    return this.skillsService.create(data);
  }

  @Put('admin/skill/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a skill' })
  async updateSkill(@Param('id') id: string, @Body() data: Partial<Skill>) {
    return this.skillsService.update(id, data);
  }

  @Delete('admin/skill/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a skill' })
  async deleteSkill(@Param('id') id: string) {
    return this.skillsService.delete(id);
  }
}
