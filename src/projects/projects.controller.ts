import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './projects.entity';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth-jwt.guard';
import { ProjectsService } from './projects.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GetUser } from 'src/users/get-user.decorator';
import { User } from 'src/users/users.entity';


@ApiTags('Проекты')
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {

  constructor(private readonly projectService: ProjectsService) {}

	@ApiOperation({ summary: 'Создать проект' })
  @ApiResponse({ status: 201, type: Project })
  @Post()
  async create(@Body() dto: CreateProjectDto, @GetUser() user: User): Promise<Project> {
    return this.projectService.createProject(dto, user);
  }

	@ApiOperation({ summary: 'Получить все проекты' })
  @ApiResponse({ status: 200, type: [Project] })
  @Get()
  async findAll(@GetUser() user: User): Promise<Project[]> {
    console.log(user);
    return this.projectService.getProjects(user);
  }

	@ApiOperation({ summary: 'Получить проект по id' })
  @ApiResponse({ status: 200, type: Project })
  @Get(':id')
  async findOne(@Param('id') id: number, @GetUser() user: User): Promise<Project> {
    return this.projectService.getProjectById(id, user);
  }

	@ApiOperation({ summary: 'Обновить проект' })
  @ApiResponse({ status: 200, type: Project })
  @Put(':id')
  async update(
    @Param('id') id: number, @Body() dto: UpdateProjectDto, @GetUser() user: User
  ): Promise<Project> {
    return this.projectService.updateProject(id, dto, user);
  }

	@ApiOperation({ summary: 'Удалить проект' })
  @ApiResponse({ status: 204, type: Project })
  @Delete(':id')
  async delete(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    return this.projectService.deleteProject(id, user);
  }
}
