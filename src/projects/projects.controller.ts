import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './projects.entity';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth-jwt.guard';

@ApiTags('Проекты')
@Controller('projects')
export class ProjectsController {
  projectService: any;

	@ApiOperation({ summary: 'Создать проект' })
  @ApiResponse({ status: 201, type: Project })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto, @Req() req): Promise<Project> {
    const user = req.user;
    return this.projectService.createProject(createProjectDto, user);
  }

	@ApiOperation({ summary: 'Получить все проекты' })
  @ApiResponse({ status: 200, type: [Project] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req): Promise<Project[]> {
    const user = req.user;
    return this.projectService.findAll(user);
  }

	@ApiOperation({ summary: 'Получить проект по id' })
  @ApiResponse({ status: 200, type: Project })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number, @Req() req): Promise<Project> {
    const user = req.user;
    return this.projectService.findOne(id, user);
  }

	@ApiOperation({ summary: 'Обновить проект' })
  @ApiResponse({ status: 200, type: Project })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto, @Req() req): Promise<Project> {
    const user = req.user;
    return this.projectService.update(id, updateProjectDto, user);
  }

	@ApiOperation({ summary: 'Удалить проект' })
  @ApiResponse({ status: 204, type: Project })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req): Promise<void> {
    const user = req.user;
    return this.projectService.remove(id, user);
  }
}
