import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './statuses.entity';
import { CreateStatusDto } from './dto/create-status.dto';
import { Project } from '../projects/projects.entity';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class StatusesService {

  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>
  ) {}

  async createStatus(projectId: number, dto: CreateStatusDto): Promise<Status> {
    const status = this.statusRepository.create({
      ...dto, project: { id: projectId }, order: dto.order
    });
    await this.statusRepository.save(status);

    const statuses = await this.getStatuses(projectId);
    await this.updateStatusOrder(statuses);

    return status;
  }

  async getStatuses(projectId: number): Promise<Status[]> {
    return await this.statusRepository.find({
      where: { project: { id: projectId } },
      relations: ['project']
    });
  }

  async getStatusById(id: number, project: Project): Promise<Status> {
    const status = await this.statusRepository.findOne({
      where: { id },
      relations: ['project']
    });
    if (!status) {
      throw new NotFoundException('Статус задачи не найден');
    }
    return status;
  }

  async updateStatus(id: number, dto: UpdateStatusDto, project: Project): Promise<Status> {
    const status = await this.getStatusById(id, project);
    Object.assign(status, dto);
    await this.statusRepository.save(status);

    const statuses = await this.getStatuses(status.project.id);
    await this.updateStatusOrder(statuses);

    return status;
  }

  async deleteStatus(id: number, project: Project): Promise<void> {
    const status = await this.getStatusById(id, project);
    await this.statusRepository.delete(status);

    const statuses = await this.getStatuses(status.project.id);
    await this.updateStatusOrder(statuses);
  }

  async moveStatus(id: number, newOrder: number, project: Project): Promise<Status[]> {
    const statusToMove = await this.getStatusById(id, project);
    const statuses = await this.getStatuses(statusToMove.project.id);

    await this.updateStatusOrder(statuses, statusToMove, newOrder);
    await this.statusRepository.save(statuses);

    return statuses;
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

    await this.statusRepository.save(statuses);

    return statuses;
  }
}
