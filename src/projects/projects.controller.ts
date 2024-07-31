import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './projects.entity';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth-jwt.guard';
import { ProjectsService } from './projects.service';


@ApiTags('Проекты')
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {

  constructor(private readonly projectService: ProjectsService) {}

	@ApiOperation({ summary: 'Создать проект' })
  @ApiResponse({ status: 201, type: Project })
  @Post()
  async create(@Body() dto: CreateProjectDto, @Req() req): Promise<Project> {
    return this.projectService.createProject(dto, req.user);
  }

	@ApiOperation({ summary: 'Получить все проекты' })
  @ApiResponse({ status: 200, type: [Project] })
  @Get()
  async findAll(@Req() req): Promise<Project[]> {
    return this.projectService.getProjects(req.user);
  }

	@ApiOperation({ summary: 'Получить проект по id' })
  @ApiResponse({ status: 200, type: Project })
  @Get(':id')
  async findOne(@Param('id') id: number, @Req() req): Promise<Project> {
    return this.projectService.getOneProject(id, req.user);
  }

	@ApiOperation({ summary: 'Обновить проект' })
  @ApiResponse({ status: 200, type: Project })
  @Put(':id')
  async update(
    @Param('id') id: number, @Body() dto: UpdateProjectDto, @Req() req
  ): Promise<Project> {
    return this.projectService.updateProject(id, dto, req.user);
  }

	@ApiOperation({ summary: 'Удалить проект' })
  @ApiResponse({ status: 204, type: Project })
  @Delete(':id')
  async delete(@Param('id') id: number, @Req() req): Promise<void> {
    return this.projectService.deleteProject(id, req.user);
  }
}
