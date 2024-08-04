import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';


@Injectable()
export class ProjectsService {

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createProject(dto: CreateProjectDto, user: User): Promise<Project> {
    const project = this.projectRepository.create({ ...dto, user });
    return await this.projectRepository.save(project);
  }

  async getProjects(user: User): Promise<Project[]> {
    return await this.projectRepository.find({
      where: { user: { id: user.id } },
      relations: ['user', 'statuses']
    });
  }

  async getOneProject(id: number, user: User): Promise<Project> {
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
    const project = await this.getOneProject(id, user);
    Object.assign(project, dto);
    return await this.projectRepository.save(project);
  }

  async deleteProject(id: number, user: User): Promise<void> {
    const project = await this.getOneProject(id, user);
    await this.projectRepository.delete(project);
  }
}
