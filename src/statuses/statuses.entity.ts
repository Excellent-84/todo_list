import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Project } from '../projects/projects.entity';

@Entity()
export class Status {

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Status title', description: 'Название статуса задачи' })
  @Column('varchar', { unique: true, nullable: true, length: 50 })
  title!: string;

  @ApiProperty({ example: '1', description: 'Номер столбца статуса задачи' })
  @Column('int', { unique: true, nullable: true })
  order!: number;

  @ManyToOne(() => Project, (project) => project.statuses)
  project: Project;
}
