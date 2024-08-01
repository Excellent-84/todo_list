import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth-jwt.guard';
import { StatusesService } from './statuses.service';
import { Status } from './statuses.entity';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';


@ApiTags('Столбцы')
@UseGuards(JwtAuthGuard)
@Controller('project/:id/columns')
export class StatusesController {

  constructor(private readonly statusService: StatusesService) {}

	@ApiOperation({ summary: 'Создать статус задачи' })
  @ApiResponse({ status: 201, type: Status })
  @Post()
  async create(
    @Param('projectId') projectId: number, @Body() dto: CreateStatusDto
  ): Promise<Status> {
    return this.statusService.createStatus(projectId, dto);
  }

	// @ApiOperation({ summary: 'Получить все проекты' })
  // @ApiResponse({ status: 200, type: [Project] })
  // @Get()
  // async findAll(@Req() req): Promise<Project[]> {
  //   return this.projectService.getProjects(req.user);
  // }

	@ApiOperation({ summary: 'Получить статус задачи по id' })
  @ApiResponse({ status: 200, type: Status })
  @Get(':id')
  async findOne(@Param('id') id: number, @Req() req): Promise<Status> {
    return this.statusService.getStatusById(id, req.project);
  }

	@ApiOperation({ summary: 'Обновить столбец' })
  @ApiResponse({ status: 200, type: Status })
  @Put(':id')
  async update(
    @Param('id') id: number, @Body() dto: UpdateStatusDto, @Req() req
  ): Promise<Status> {
    return this.statusService.updateStatus(id, dto, req.project);
  }

	@ApiOperation({ summary: 'Удалить статус задачи' })
  @ApiResponse({ status: 204, type: Status })
  @Delete(':id')
  async delete(@Param('id') id: number, @Req() req): Promise<void> {
    return this.statusService.deleteStatus(id, req.project);
  }
}
