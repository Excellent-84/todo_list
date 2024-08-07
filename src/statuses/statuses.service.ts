import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './statuses.entity';
import { CreateStatusDto } from './dto/create-status.dto';
import { Project } from '../projects/projects.entity';
import { UpdateStatusDto } from './dto/update-status.dto';
import { StatusEnum } from './statuses.enum';
import { User } from 'src/users/users.entity';

@Injectable()
export class StatusesService {

  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>
  ) {}

  async createStatus(projectId: number, dto: CreateStatusDto): Promise<Status> {
    const status = this.statusRepository.create({ ...dto, project: { id: projectId } });
    return await this.statusRepository.save(status);
  }

  // async getStatuses(projectId: number): Promise<Status[]> {
  //   return await this.statusRepository.find({
  //     where: { project: { id: projectId } },
  //     // relations: ['project']
  //   });
  // }

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
    return await this.statusRepository.save(status);
  }

  async deleteStatus(id: number, project: Project): Promise<void> {
    const status = await this.getStatusById(id, project);
    await this.statusRepository.delete(status);
  }

  // async moveStatus(id: number, newOrder: number, project: Project): Promise<void> {
  //   const status = await this.getStatusById(id, project);
  //   // status.order = newOrder;
  //   // await this.statusRepository.save(status);
  //   // const columnToMove = await this.columnsRepository.findOne(id);

  //   // const status = await this.statusRepository.findOne(id);
  //   // if (!status) {
  //   //   throw new NotFoundException('Column not found');
  //   // }
  // }

  async moveStatus(projectId: number, order: { id: number, order: number }[]): Promise<void> {
    const statuses = order.map(({ id, order }) => ({ id, order }));
    await this.statusRepository.update(
      { project: { id: projectId } },
      statuses.reduce((obj, { id, order }) => ({ ...obj, [id]: { order } }), {}),
    );
  }
}
