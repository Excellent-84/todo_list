import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/users.entity';
import { StatusesService } from '../statuses/statuses.service';
import { MoveTaskDto } from './dto/move-task.dto';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private readonly statusService: StatusesService
  ) {}

  async createTask(
    projectId: number, statusId: number, dto: CreateTaskDto, user: User
  ): Promise<Task> {
    const tasks = await this.getTasks(projectId, statusId, user);
    const order = tasks.length + 1;
    const task = this.tasksRepository.create({
      ...dto, order, status: { id: statusId }
    });
    try {
      await this.tasksRepository.save(task);
      return task;
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при создании задачи');
    }
  }

  async getTasks(projectId: number, statusId: number, user: User): Promise<Task[]> {
    const status = await this.statusService.getStatusById(projectId, statusId, user);
    return status.tasks;
  }

  async getTaskById(
    projectId: number, statusId: number, taskId: number, user: User
  ): Promise<Task> {
    await this.getTasks(projectId, statusId, user);
    const task = await this.tasksRepository.findOne({
      where: { id: taskId },
      relations: ['status']
    });
    if (!task) {
      throw new NotFoundException('Задача не найдена');
    }
    return task;
  }

  async updateTask(
    projectId: number, statusId: number, taskId: number, dto: UpdateTaskDto, user: User
  ): Promise<Task> {
    const task = await this.getTaskById(projectId, statusId, taskId, user);
    Object.assign(task, dto);
    return await this.tasksRepository.save(task);
  }

  async deleteTask(
    projectId: number, statusId: number, taskId: number, user: User
  ): Promise<void> {
    const task = await this.getTaskById(projectId, statusId, taskId, user);
    await this.tasksRepository.remove(task);

    const tasks = await this.getTasks(projectId, statusId, user);
    await this.updateTaskOrder(tasks);
  }

  async moveTask(
    projectId: number, statusId: number, taskId: number, user: User, dto: MoveTaskDto
  ): Promise<Task> {
    const taskToMove = await this.getTaskById(projectId, statusId, taskId, user);
    const tasks = await this.getTasks(projectId, statusId, user);

    if (dto.statusId) {
      const newTasks = await this.getTasks(projectId, dto.statusId, user);
      taskToMove.status.id = dto.statusId;
      await this.tasksRepository.save(taskToMove);
      await this.updateTaskOrder(newTasks);
    }

    if (dto.order) {
      await this.updateTaskOrder(tasks, taskToMove, dto.order);
    }

    await this.updateTaskOrder(tasks);
    return taskToMove;
  }

  private async updateTaskOrder(
    tasks: Task[], taskToMove?: Task, newOrder?: number
  ): Promise<Task[]> {
    if (taskToMove) {
      const moveIndex = tasks.findIndex(task => task.id === taskToMove.id);
      tasks.splice(moveIndex, 1);
      tasks.splice(newOrder - 1, 0, taskToMove);
    }

    tasks.forEach((task, index) => {
      task.order = index + 1;
    });

    return await this.tasksRepository.save(tasks);
  }
}
