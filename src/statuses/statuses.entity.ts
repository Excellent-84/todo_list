import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Project } from '../projects/projects.entity';
import { Task } from '../tasks/tasks.entity';

@Entity('statuses')
export class Status {

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Status title', description: 'Название статуса задачи' })
  @Column('varchar', { length: 50 })
  title!: string;

  @ApiProperty({ example: '1', description: 'Номер статуса задачи' })
  @Column('int')
  order!: number;

  @ManyToOne(() => Project, (project) => project.statuses, { onDelete: 'CASCADE'})
  project: Project;

  @OneToMany(() => Task, (task) => task.status, { cascade: true })
  tasks: Task[];
}
