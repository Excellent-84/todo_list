import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './projects.entity';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  projectService: any;

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto, @Req() req): Promise<Project> {
    const user = req.user;
    return this.projectService.createProject(createProjectDto, user);
  }

  @Get()
  async findAll(@Req() req): Promise<Project[]> {
    const user = req.user;
    return this.projectService.findAll(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Req() req): Promise<Project> {
    const user = req.user;
    return this.projectService.findOne(id, user);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto, @Req() req): Promise<Project> {
    const user = req.user;
    return this.projectService.update(id, updateProjectDto, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req): Promise<void> {
    const user = req.user;
    return this.projectService.remove(id, user);
  }
}
