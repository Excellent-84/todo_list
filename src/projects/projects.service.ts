import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Status } from '../statuses/statuses.entity';
import { StatusEnum } from '../statuses/statuses.enum';


@Injectable()
export class ProjectsService {

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>
  ) {}

  async createProject(dto: CreateProjectDto, user: User): Promise<Project> {
    const project = this.projectRepository.create({ ...dto, user });
    await this.projectRepository.save(project);
    const initialStatuses = [
      { title: StatusEnum.TO_DO, order: 1, project },
      { title: StatusEnum.IN_PROGRESS, order: 2, project },
      { title: StatusEnum.DONE, order: 3, project },
    ];
    await this.statusRepository.save(initialStatuses);
    return project;
  }

  async getProjects(user: User): Promise<Project[]> {
    return await this.projectRepository.find({
      where: { user: { id: user.id } },
      relations: ['user', 'statuses']
    });
  }

  async getProjectById(id: number, user: User): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['user', 'statuses']
    });
    if (!project || project.user.id !== user.id) {
      throw new ForbiddenException('У вас нет доступа к этому проекту');
    }
    return project;
  }

  async updateProject(id: number, dto: UpdateProjectDto, user: User): Promise<Project> {
    const project = await this.getProjectById(id, user);
    Object.assign(project, dto);
    return await this.projectRepository.save(project);
  }

  async deleteProject(id: number, user: User): Promise<void> {
    const project = await this.getProjectById(id, user);
    await this.projectRepository.remove(project);
  }
}
