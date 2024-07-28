import { Injectable, NotFoundException } from '@nestjs/common';
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

    async createProject(createProjectDto: CreateProjectDto, user: User): Promise<Project> {
        const project = this.projectRepository.create({ ...createProjectDto, user });
        return await this.projectRepository.save(project);
    }

    async findAll(user: User): Promise<Project[]> {
        return await this.projectRepository.find({ where: { user } });
    }

    async findOne(id: number, user: User): Promise<Project> {
        const project = await this.projectRepository.findOne({ where: { id, user } });
        if (!project) {
            throw new NotFoundException();
        }
        return project;
    }

    async update(id: number, updateProjectDto: UpdateProjectDto, user: User): Promise<Project> {
        const project = await this.findOne(id, user);
        Object.assign(project, updateProjectDto);
        return await this.projectRepository.save(project);
    }

    async remove(id: number, user: User): Promise<void> {
        const project = await this.findOne(id, user);
        await this.projectRepository.remove(project);
    }
}
