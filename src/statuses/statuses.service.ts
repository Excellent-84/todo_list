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

  async createStatus(dto: CreateStatusDto, projectId: number): Promise<Status> {
    const status = this.statusRepository.create({ ...dto, project: { id: projectId } });
    return await this.statusRepository.save(status);
  }

  // async createColumn(dto: CreateColumnDto, project: Project): Promise<ColumnName> {
  //   const column = this.columnNameRepository.create({ ...dto, project });
  //   return await this.columnNameRepository.save(column);
  // }

  // async getProjects(user: User): Promise<Project[]> {
  //   return await this.projectRepository.find({
  //     where: { user: { id: user.id } },
  //     relations: ['user']
  //   });
  // }

  async getStatusById(id: number, project: Project): Promise<Status> {
    const status = await this.statusRepository.findOne({
      where: { id },
      relations: ['project']
    });
    if (!status) {
      throw new NotFoundException('Столбец не найден');
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
}
