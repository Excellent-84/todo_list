import { ApiProperty } from "@nestjs/swagger";
import { Status } from "../statuses/statuses.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Task title', description: 'Название задачи' })
  @Column('varchar', { nullable: true, length: 50 })
  title!: string;

  @ApiProperty({ example: 'Task description', description: 'Описание задачи' })
  @Column('varchar', { length: 255, nullable: true })
  description?: string;

  @ApiProperty({ example: 'DateTime', description: 'Дата и время создания' })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt!: Date;

  @ApiProperty({ example: '1', description: 'Номер задачи' })
  @Column('int')
  order!: number;

  @ManyToOne(() => Status, (status) => status.tasks, { onDelete: 'CASCADE'})
  status: Status;
}
