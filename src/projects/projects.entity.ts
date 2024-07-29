import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Project {

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Project example', description: 'Название проекта' })
  @Column('varchar', { nullable: false, length: 50 })
  title!: string;

  @ApiProperty({ example: 'Description example', description: 'Описание проекта' })
  @Column('varchar', { length: 255 })
  description!: string;

  @ApiProperty({ example: 'John', description: 'Время создания' })
  @CreateDateColumn()
  createAd!: Date;

  @ManyToOne(() => User, user => user.project)
  user: User;
}
