import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Status } from '../statuses/statuses.entity';

@Entity('projects')
export class Project {

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Project title', description: 'Название проекта' })
  @Column('varchar', { length: 50 })
  title!: string;

  @ApiProperty({ example: 'Project description', description: 'Описание проекта' })
  @Column('varchar', { nullable: true, length: 255 })
  description?: string;

  @ApiProperty({ example: 'DateTime', description: 'Дата и время создания' })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @OneToMany(() => Status, (status) => status.project, { cascade: true })
  statuses: Status[];
}
