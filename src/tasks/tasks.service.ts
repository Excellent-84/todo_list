import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) {}

  async createTask(projectId: number, dto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create({
      ...dto, status: { id: projectId }, order: dto.order
    });
    await this.taskRepository.save(task);

    const tasks = await this.getTasks(projectId);
    await this.updateTaskOrder(tasks);

    return task;
  }

  async getTasks(projectId: number): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { status: { id: projectId } },
      relations: ['status']
    });
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['status']
    });
    if (!task) {
      throw new NotFoundException('Задача не найдена');
    }
    return task;
  }

  // order не меняется в updateStatus
  async updateTask(id: number, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.getTaskById(id);
    Object.assign(task, dto);
    await this.taskRepository.save(task);

    const tasks = await this.getTasks(task.status.id);
    await this.updateTaskOrder(tasks);

    return task;
  }

  async deleteTask(id: number): Promise<void> {
    const task = await this.getTaskById(id);
    await this.taskRepository.delete(task);

    const tasks = await this.getTasks(task.status.id);
    await this.updateTaskOrder(tasks);
  }

  async moveTask(id: number, newOrder: number): Promise<Task[]> {
    const taskToMove = await this.getTaskById(id);
    const tasks = await this.getTasks(taskToMove.status.id);

    await this.updateTaskOrder(tasks, taskToMove, newOrder);
    await this.taskRepository.save(tasks);

    return tasks;
  }

  private async updateTaskOrder(
    tasks: Task[], taskToMove?: Task, newOrder?: number
  ): Promise<Task[]> {
    if (taskToMove) {
      const moveIndex = tasks.findIndex(task => task.id === taskToMove.id);
      tasks.splice(newOrder - 1, 0, ...tasks.splice(moveIndex, 1));
    }

    tasks.forEach((task, index) => {
      task.order = index + 1;
    });

    await this.taskRepository.save(tasks);

    return tasks;
  }
}
