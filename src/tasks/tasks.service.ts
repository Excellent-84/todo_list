import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/users.entity';
import { StatusesService } from '../statuses/statuses.service';

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
    const task = this.tasksRepository.create({
      ...dto, status: { id: statusId }, order: dto.order
    });
    const tasks = await this.getTasks(projectId, statusId, user);
    await this.tasksRepository.save(task);
    await this.updateTaskOrder(tasks);

    return task;
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
    await this.tasksRepository.save(task);

    const tasks = await this.getTasks(projectId, statusId, user);
    await this.updateTaskOrder(tasks);

    return task;
  }

  async deleteTask(
    projectId: number, statusId: number, taskId: number, user: User
  ): Promise<void> {
    const task = await this.getTaskById(projectId, statusId, taskId, user);
    const tasks = await this.getTasks(projectId, statusId, user);
    await this.tasksRepository.remove(task);
    await this.updateTaskOrder(tasks);
  }

  async moveTask(
    projectId: number,
    statusId: number,
    taskId: number,
    user: User,
    newOrder?: number,
    newStatusId?: number
  ): Promise<Task[]> {
    const taskToMove = await this.getTaskById(projectId, statusId, taskId, user);
    const currentStatusId = taskToMove.status.id;

    taskToMove.status.id = newStatusId;
    await this.tasksRepository.save(taskToMove);

    const currentTasks = await this.getTasks(projectId, statusId, user);
    await this.updateTaskOrder(currentTasks);

    const newTasks = await this.getTasks(projectId, newStatusId, user);

    taskToMove.order = newOrder;

    await this.updateTaskOrder(newTasks, taskToMove, newOrder);

    return newTasks;
  }

  private async updateTaskOrder(
    tasks: Task[], taskToMove?: Task, newOrder?: number
  ): Promise<Task[]> {
    if (taskToMove) {
        const moveIndex = tasks.findIndex(task => task.id === taskToMove.id);
        if (moveIndex !== -1) {
            tasks.splice(moveIndex, 1);
        }
        tasks.splice(newOrder - 1, 0, taskToMove);
    }

    tasks.forEach((task, index) => {
        task.order = index + 1;
    });

    await this.tasksRepository.save(tasks);

    return tasks;
  }
}
