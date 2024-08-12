import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth-jwt.guard';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('Задачи')
@UseGuards(JwtAuthGuard)
@Controller('projects/:id/statuses/:id/tasks')
export class TasksController {

  constructor(private readonly taskService: TasksService) {}

	@ApiOperation({ summary: 'Создать задачу' })
  @ApiResponse({ status: 201, type: Task })
  @Post()
  async create(
    @Param('id') statusId: number, @Body() dto: CreateTaskDto
  ): Promise<Task> {
    return this.taskService.createTask(statusId, dto);
  }

	@ApiOperation({ summary: 'Получить все задачи' })
  @ApiResponse({ status: 200, type: [Task] })
  @Get()
  async findAll(@Param('id') statusId: number): Promise<Task[]> {
    return this.taskService.getTasks(statusId);
  }

	@ApiOperation({ summary: 'Получить задачу по id' })
  @ApiResponse({ status: 200, type: Task })
  @Get(':id')
  async findOne(@Param('id') id: number, @Req() req): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

	@ApiOperation({ summary: 'Обновить задачу' })
  @ApiResponse({ status: 200, type: Task })
  @Put(':id')
  async update(
    @Param('id') id: number, @Body() dto: UpdateTaskDto, @Req() req
  ): Promise<Task> {
    return this.taskService.updateTask(id, dto);
  }

  @ApiOperation({ summary: 'Удалить задачу' })
  @ApiResponse({ status: 204, type: Task })
  @Delete(':id')
  async delete(@Param('id') id: number, @Req() req): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @ApiOperation({ summary: 'Переместить задачу' })
  @ApiResponse({ status: 200, type: [Task] })
  @Put(':id/move')
  async move(
    @Param('id') id: number,
    @Body('newOrder') newOrder: number,
    @Body('newStatusId') newStatusId: number
  ): Promise<Task[]> {
    return this.taskService.moveTask(id, newOrder, newStatusId);
  }
}
