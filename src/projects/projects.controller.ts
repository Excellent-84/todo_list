import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './projects.entity';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/users.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ParamsProjectDto } from './dto/params-project.dto';


@ApiTags('Проекты')
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {

  constructor(private readonly projectService: ProjectsService) {}

	@ApiOperation({ summary: 'Создать проект' })
  @ApiResponse({ status: 201, type: Project })
  @Post()
  async create(
    @Body() dto: CreateProjectDto,
    @GetUser() user: User
  ): Promise<Project> {
    return this.projectService.createProject(dto, user);
  }

	@ApiOperation({ summary: 'Получить все проекты' })
  @ApiResponse({ status: 200, type: [Project] })
  @Get()
  async findAll(@GetUser() user: User): Promise<Project[]> {
    return this.projectService.getProjects(user);
  }

	@ApiOperation({ summary: 'Получить проект по id' })
  @ApiResponse({ status: 200, type: Project })
  @Get(':projectId')
  async findOne(
    @Param() params: ParamsProjectDto,
    @GetUser() user: User
  ): Promise<Project> {
    return this.projectService.getProjectById(params.projectId, user);
  }

	@ApiOperation({ summary: 'Обновить проект' })
  @ApiResponse({ status: 200, type: Project })
  @Put(':projectId')
  async update(
    @Param() params: ParamsProjectDto,
    @Body() dto: UpdateProjectDto,
    @GetUser() user: User
  ): Promise<Project> {
    return this.projectService.updateProject(params.projectId, dto, user);
  }

	@ApiOperation({ summary: 'Удалить проект' })
  @HttpCode(204)
  @Delete(':projectId')
  async delete(
    @Param() params: ParamsProjectDto,
    @GetUser() user: User
  ): Promise<void> {
    return this.projectService.deleteProject(params.projectId, user);
  }
}
