import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Unique } from 'typeorm';
import { Project } from '../projects/projects.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['project', 'title'])
export class Status {

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Status title', description: 'Название статуса задачи' })
  @Column('varchar', { nullable: true, length: 50 })
  title!: string;

  @ApiProperty({ example: '1', description: 'Номер столбца статуса задачи' })
  @Column('int', { nullable: true })
  order!: number;

  @ManyToOne(() => Project, (project) => project.statuses, { onDelete: 'CASCADE'})
  // @Exclude()
  project: Project;
}
