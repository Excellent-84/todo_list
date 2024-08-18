import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth-jwt.guard';
import { StatusesService } from './statuses.service';
import { Status } from './statuses.entity';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/users.entity';


@ApiTags('Статусы задач')
@UseGuards(JwtAuthGuard)
@Controller('projects/:id/statuses')
export class StatusesController {

  constructor(private readonly statusService: StatusesService) {}

  @ApiOperation({ summary: 'Создать статус задачи' })
  @ApiResponse({ status: 201, type: Status })
  @Post()
  async create(
    @Param('id') projectId: number,
    @Body() dto: CreateStatusDto,
    @GetUser() user: User
  ): Promise<Status> {
    return this.statusService.createStatus(projectId, dto, user);
  }

  @ApiOperation({ summary: 'Получить все статусы' })
  @ApiResponse({ status: 200, type: [Status] })
  @Get()
  async findAll(
    @Param('id') projectId: number,
    @GetUser() user: User
  ): Promise<Status[]> {
    return this.statusService.getStatuses(projectId, user);
  }

  @ApiOperation({ summary: 'Получить статус задачи по id' })
  @ApiResponse({ status: 200, type: Status })
  @Get(':statusId')
  async findOne(
    @Param('id') projectId: number,
    @Param('statusId') statusId: number,
    @GetUser() user: User
  ): Promise<Status> {
    return this.statusService.getStatusById(projectId, statusId, user);
  }

	@ApiOperation({ summary: 'Обновить статус задачи' })
  @ApiResponse({ status: 200, type: Status })
  @Put(':statusId')
  async update(
    @Param('id') projectId: number,
    @Param('statusId') statusId: number,
    @Body() dto: UpdateStatusDto,
    @GetUser() user: User
  ): Promise<Status> {
    return this.statusService.updateStatus(projectId, statusId, dto, user);
  }

  @ApiOperation({ summary: 'Удалить статус задачи' })
  @HttpCode(204)
  @Delete(':statusId')
  async delete(
    @Param('id') projectId: number,
    @Param('statusId') statusId: number,
    @GetUser() user: User
  ): Promise<void> {
    return this.statusService.deleteStatus(projectId, statusId, user);
  }

  @ApiOperation({ summary: 'Переместить статус задачи' })
  @ApiResponse({ status: 200, type: [Status] })
  @Put(':statusId/move')
  async move(
    @Param('id') projectId: number,
    @Param('statusId') statusId: number,
    @Body('newOrder') newOrder: number,
    @GetUser() user: User
  ): Promise<Status[]> {
    return this.statusService.moveStatus(projectId, statusId, newOrder, user);
  }
}
