import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Project {

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Project name', description: 'Название проекта' })
  @Column('varchar', { nullable: false, length: 50 })
  title!: string;

  @ApiProperty({ example: 'Project description', description: 'Описание проекта' })
  @Column('varchar', { length: 255 })
  description?: string;

  @ApiProperty({ example: 'DateTime', description: 'Дата и время создания' })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;
}
