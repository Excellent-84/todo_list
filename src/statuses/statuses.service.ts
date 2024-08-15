import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './statuses.entity';
import { CreateStatusDto } from './dto/create-status.dto';
import { Project } from '../projects/projects.entity';
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

  async createStatus(projectId: number, dto: CreateStatusDto, user: User): Promise<Status> {
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

  async getStatusById(projectId: number, statusId: number, user: User): Promise<Status> {
    await this.getStatuses(projectId, user);
    const status = await this.statusRepository.findOne({
      where: { id: statusId },
      relations: ['tasks']
    });
    if (!status) {
      throw new NotFoundException('Статус задачи не найден');
    }
    return status;
  }


// @Injectable()
// export class StatusesService {

//   constructor(
//     @InjectRepository(Status)
//     private readonly statusRepository: Repository<Status>
//   ) {}

//   async createStatus(projectId: number, dto: CreateStatusDto): Promise<Status> {
//     const status = this.statusRepository.create({
//       ...dto, project: { id: projectId }, order: dto.order
//     });
//     await this.statusRepository.save(status);

//     const statuses = await this.getStatuses(projectId);
//     await this.updateStatusOrder(statuses);

//     return status;
//   }

//   async getStatuses(projectId: number): Promise<Status[]> {
//     return await this.statusRepository.find({
//       where: { project: { id: projectId }},
//       relations: ['project']
//     });
//   }

//   async getStatusById(id: number, project: Project): Promise<Status> {
//     const status = await this.statusRepository.findOne({
//       where: { id },
//       relations: ['project']
//     });
//     if (!status) {
//       throw new NotFoundException('Статус задачи не найден');
//     }
//     return status;
//   }

//   // order не меняется в updateStatus
//   async updateStatus(
//     id: number, dto: UpdateStatusDto, project: Project): Promise<Status> {
//     const status = await this.getStatusById(id, project);
//     Object.assign(status, dto);
//     await this.statusRepository.save(status);

//     const statuses = await this.getStatuses(status.project.id);
//     await this.updateStatusOrder(statuses);

//     return status;
//   }

//   async deleteStatus(id: number, project: Project): Promise<void> {
//     const status = await this.getStatusById(id, project);
//     await this.statusRepository.delete(status);

//     const statuses = await this.getStatuses(status.project.id);
//     await this.updateStatusOrder(statuses);
//   }

  async moveStatus(statusId: number, projectId: number, newOrder: number, user: User): Promise<Status[]> {
    const statusToMove = await this.getStatusById(statusId, projectId, user);
    const statuses = await this.getStatuses(statusToMove.project.id, user);

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
