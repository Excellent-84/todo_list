import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './statuses.entity';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { User } from '../users/users.entity';
import { ProjectsService } from '../projects/projects.service';



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
    const status = this.statusRepository.create({
      ...dto, project: { id: projectId }, order: dto.order
    });
    await this.statusRepository.save(status);

    const statuses = await this.getStatuses(projectId, user);
    await this.updateStatusOrder(statuses);

    return status;
  }

  async getStatuses(projectId: number, user: User): Promise<Status[]> {
    const project = await this.projectsService.getProjectById(projectId, user);
    return project.statuses;
  }

  async getStatusById(
    projectId: number, statusId: number, user: User
  ): Promise<Status> {
    await this.getStatuses(projectId, user);
    const status = await this.statusRepository.findOne({
      where: { id: statusId }
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
    await this.statusRepository.save(status);

    const statuses = await this.getStatuses(projectId, user);
    await this.updateStatusOrder(statuses);

    return status;
  }

  async deleteStatus(
    projectId: number, statusId: number, user: User
  ): Promise<void> {
    const status = await this.getStatusById(projectId, statusId, user);
    await this.statusRepository.delete(status);

    const statuses = await this.getStatuses(projectId, user);
    await this.updateStatusOrder(statuses);
  }

  async moveStatus(
    projectId: number, statusId: number, newOrder: number, user: User
  ): Promise<Status[]> {
    const statusToMove = await this.getStatusById(projectId, statusId, user);
    const statuses = await this.getStatuses(projectId, user);
    await this.updateStatusOrder(statuses, statusToMove, newOrder);

    return await this.statusRepository.save(statuses);
  }

  private async updateStatusOrder(
    statuses: Status[], statusToMove?: Status, newOrder?: number
  ): Promise<Status[]> {
    if (statusToMove) {
      const moveIndex = statuses.findIndex(status => status.id === statusToMove.id);
      statuses.splice(newOrder - 1, 0, ...statuses.splice(moveIndex, 1));
    }

    statuses.forEach((status, index) => {
      status.order = index + 1;
    });

    return await this.statusRepository.save(statuses);
  }
}
