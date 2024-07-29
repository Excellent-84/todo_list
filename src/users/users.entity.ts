import { ApiProperty } from '@nestjs/swagger';
import { Project } from 'src/projects/projects.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class User {
  // projects: any;

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'john@example.com', description: 'Почтовый адрес' })
  @Column('varchar', { unique: true, nullable: false, length: 50 })
  email!: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @Column('varchar', { length: 255, nullable: false })
  password!: string;

  @ApiProperty({ example: 'John', description: 'Имя пользователя' })
  @Column('varchar', { length: 100, nullable: false })
  name?: string;

  @OneToMany(() => Project, (project) => project.user)
  @JoinColumn({ name: 'projectId' })
  project: Project;
}
