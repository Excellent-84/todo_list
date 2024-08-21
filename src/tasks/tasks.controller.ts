import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/users.entity';
import { MoveTaskDto } from './dto/move-task.dto';
import { ParamsTaskDto } from './dto/ params-task.dto';
import { ParamsStatusDto } from '../statuses/dto/params-status.dto';

@ApiTags('Задачи')
@UseGuards(JwtAuthGuard)
@Controller('projects/:projectId/statuses/:statusId/tasks')
export class TasksController {

  constructor(private readonly taskService: TasksService) {}

	@ApiOperation({ summary: 'Создать задачу' })
  @ApiResponse({ status: 201, type: Task })
  @Post()
  async create(
    @Param() params: ParamsStatusDto,
    @Body() dto: CreateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    return this.taskService.createTask(params.projectId, params.statusId, dto, user);
  }

	@ApiOperation({ summary: 'Получить все задачи' })
  @ApiResponse({ status: 200, type: [Task] })
  @Get()
  async findAll(
    @Param() params: ParamsStatusDto,
    @GetUser() user: User
  ): Promise<Task[]> {
    return this.taskService.getTasks(params.projectId, params.statusId, user);
  }

	@ApiOperation({ summary: 'Получить задачу по id' })
  @ApiResponse({ status: 200, type: Task })
  @Get(':taskId')
  async findOne(
    @Param() params: ParamsTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    return this.taskService.getTaskById(
      params.projectId, params.statusId, params.taskId, user
    );
  }

	@ApiOperation({ summary: 'Обновить задачу' })
  @ApiResponse({ status: 200, type: Task })
  @Put(':taskId')
  async update(
    @Param() params: ParamsTaskDto,
    @Body() dto: UpdateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    return this.taskService.updateTask(
      params.projectId, params.statusId, params.taskId, dto, user
    );
  }

  @ApiOperation({ summary: 'Удалить задачу' })
  @HttpCode(204)
  @Delete(':taskId')
  async delete(
    @Param() params: ParamsTaskDto,
    @GetUser() user: User
  ): Promise<void> {
    return this.taskService.deleteTask(
      params.projectId, params.statusId, params.taskId, user
    );
  }

  @ApiOperation({ summary: 'Переместить задачу' })
  @ApiResponse({ status: 200, type: Task })
  @Put(':taskId/move')
  async move(
    @Param() params: ParamsTaskDto,
    @Body() dto: MoveTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.moveTask(
      params.projectId, params.statusId, params.taskId, user, dto
    );
  }
}
