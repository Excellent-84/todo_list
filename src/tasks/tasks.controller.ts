import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/users.entity';
import { MoveTaskDto } from './dto/move-task.dto';

@ApiTags('Задачи')
@UseGuards(JwtAuthGuard)
@Controller('projects/:id/statuses/:statusId/tasks')
export class TasksController {

  constructor(private readonly taskService: TasksService) {}

	@ApiOperation({ summary: 'Создать задачу' })
  @ApiResponse({ status: 201, type: Task })
  @Post()
  async create(
    @Param('id') projectId: number,
    @Param('statusId') statusId: number,
    @Body() dto: CreateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    return this.taskService.createTask(projectId, statusId, dto, user);
  }

	@ApiOperation({ summary: 'Получить все задачи' })
  @ApiResponse({ status: 200, type: [Task] })
  @Get()
  async findAll(
    @Param('id') projectId: number,
    @Param('statusId') statusId: number,
    @GetUser() user: User
  ): Promise<Task[]> {
    return this.taskService.getTasks(projectId, statusId, user);
  }

	@ApiOperation({ summary: 'Получить задачу по id' })
  @ApiResponse({ status: 200, type: Task })
  @Get(':taskId')
  async findOne(
    @Param('id') projectId: number,
    @Param('statusId') statusId: number,
    @Param('taskId') taskId: number,
    @GetUser() user: User
  ): Promise<Task> {
    return this.taskService.getTaskById(projectId, statusId, taskId, user);
  }

	@ApiOperation({ summary: 'Обновить задачу' })
  @ApiResponse({ status: 200, type: Task })
  @Put(':taskId')
  async update(
    @Param('id') projectId: number,
    @Param('statusId') statusId: number,
    @Param('taskId') taskId: number,
    @Body() dto: UpdateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    return this.taskService.updateTask(projectId, statusId, taskId, dto, user);
  }

  @ApiOperation({ summary: 'Удалить задачу' })
  @ApiResponse({ status: 204, type: Task })
  @Delete(':taskId')
  async delete(
    @Param('id') projectId: number,
    @Param('statusId') statusId: number,
    @Param('taskId') taskId: number,
    @GetUser() user: User
  ): Promise<void> {
    return this.taskService.deleteTask(projectId, statusId, taskId, user);
  }

  @ApiOperation({ summary: 'Переместить задачу' })
  @ApiResponse({ status: 200, type: Task })
  @Put(':taskId/move')
  async move(
    @Param('id') projectId: number,
    @Param('statusId') statusId: number,
    @Param('taskId') taskId: number,
    @Body() dto: MoveTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.moveTask(projectId, statusId, taskId, user, dto);
  }
}
