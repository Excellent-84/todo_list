import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './statuses.entity';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { User } from '../users/users.entity';
import { ProjectsService } from '../projects/projects.service';
import { MoveStatusDto } from './dto/move-status.dto';

@Injectable()
export class StatusesService {

  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    private readonly projectsService: ProjectsService
  ) {}

  async createStatus(
    projectId: number, dto: CreateStatusDto, user: User
  ): Promise<Status> {
    const statuses = await this.getStatuses(projectId, user);
    const order = statuses.length + 1;
    const status = this.statusRepository.create({
      ...dto, order, project: { id: projectId }
    });
    try {
      await this.statusRepository.save(status);
      return status;
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при создании статуса');
    }
  }

  async getStatuses(projectId: number, user: User): Promise<Status[]> {
    const project = await this.projectsService.getProjectById(projectId, user);
    return project.statuses;
  }

  async getStatusById(
    projectId: number, statusId: number, user: User
  ): Promise<Status> {
    await this.projectsService.getProjectById(projectId, user);
    const status = await this.statusRepository.findOne({
      where: { id: statusId },
      relations: ['tasks']
    });
    if (!status) {
      throw new NotFoundException('Статус задачи не найден');
    }
    return status;
  }

  async updateStatus(
    projectId: number, statusId: number, dto: UpdateStatusDto, user: User
  ): Promise<Status> {
    const status = await this.getStatusById(projectId, statusId, user);
    Object.assign(status, dto);
    try {
      return this.statusRepository.save(status);
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при обновлении статуса');
    }
  }

  async deleteStatus(
    projectId: number, statusId: number, user: User
  ): Promise<void> {
    const status = await this.getStatusById(projectId, statusId, user);
    try {
      await this.statusRepository.remove(status);
      const statuses = await this.getStatuses(projectId, user);
      await this.updateStatusOrder(statuses);
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при удалении статуса');
    }
  }

  async moveStatus(
    projectId: number, statusId: number, dto: MoveStatusDto, user: User
  ): Promise<Status[]> {
    const statusToMove = await this.getStatusById(projectId, statusId, user);
    const statuses = await this.getStatuses(projectId, user);

    await this.updateStatusOrder(statuses, statusToMove, dto.order);
    return statuses;
  }

  private async updateStatusOrder(
    statuses: Status[], statusToMove?: Status, newOrder?: number,
  ): Promise<Status[]> {
    if (statusToMove) {
      const moveIndex = statuses.findIndex(status => status.id === statusToMove.id);
      statuses.splice(moveIndex, 1);
      statuses.splice(newOrder - 1, 0, statusToMove);
    }

    statuses.forEach((status, index) => {
      status.order = index + 1;
    });

    return await this.statusRepository.save(statuses);
  }
}
