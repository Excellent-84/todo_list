import { ApiProperty } from '@nestjs/swagger';
import { Project } from '../projects/projects.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'john@example.com', description: 'Почтовый адрес' })
  @Column('varchar', { unique: true, nullable: false, length: 50 })
  email!: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @Exclude()
  @Column('varchar', { length: 255, nullable: false })
  password!: string;

  @ApiProperty({ example: 'John', description: 'Имя пользователя' })
  @Column('varchar', { length: 100, nullable: false })
  name?: string;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];
}
