import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatusesService } from './statuses.service';
import { Status } from './statuses.entity';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/users.entity';
import { MoveStatusDto } from './dto/move-status.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ParamsStatusDto } from './dto/params-status.dto';
import { ParamsProjectDto } from '../projects/dto/params-project.dto';

@ApiTags('Статусы задач')
@UseGuards(JwtAuthGuard)
@Controller('projects/:projectId/statuses')
export class StatusesController {

  constructor(private readonly statusService: StatusesService) {}

  @ApiOperation({ summary: 'Создать статус задачи' })
  @ApiResponse({ status: 201, type: Status })
  @Post()
  async create(
    @Param() params: ParamsProjectDto,
    @Body() dto: CreateStatusDto,
    @GetUser() user: User
  ): Promise<Status> {
    return this.statusService.createStatus(params.projectId, dto, user);
  }

  @ApiOperation({ summary: 'Получить все статусы' })
  @ApiResponse({ status: 200, type: [Status] })
  @Get()
  async findAll(
    @Param() params: ParamsProjectDto,
    @GetUser() user: User
  ): Promise<Status[]> {
    return this.statusService.getStatuses(params.projectId, user);
  }

  @ApiOperation({ summary: 'Получить статус задачи по id' })
  @ApiResponse({ status: 200, type: Status })
  @Get(':statusId')
  async findOne(
    @Param() params: ParamsStatusDto,
    @GetUser() user: User
  ): Promise<Status> {
    return this.statusService.getStatusById(params.projectId, params.statusId, user);
  }

	@ApiOperation({ summary: 'Обновить статус задачи' })
  @ApiResponse({ status: 200, type: Status })
  @Put(':statusId')
  async update(
    @Param() params: ParamsStatusDto,
    @Body() dto: UpdateStatusDto,
    @GetUser() user: User
  ): Promise<Status> {
    return this.statusService.updateStatus(params.projectId, params.statusId, dto, user);
  }

  @ApiOperation({ summary: 'Удалить статус задачи' })
  @HttpCode(204)
  @Delete(':statusId')
  async delete(
    @Param() params: ParamsStatusDto,
    @GetUser() user: User
  ): Promise<void> {
    return this.statusService.deleteStatus(params.projectId, params.statusId, user);
  }

  @ApiOperation({ summary: 'Переместить статус задачи' })
  @ApiResponse({ status: 200, type: [Status] })
  @Put(':statusId/move')
  async move(
    @Param() params: ParamsStatusDto,
    @Body() dto: MoveStatusDto,
    @GetUser() user: User
  ): Promise<Status[]> {
    return this.statusService.moveStatus(params.projectId, params.statusId, dto, user);
  }
}
