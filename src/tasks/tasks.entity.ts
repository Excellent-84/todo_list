import { ApiProperty } from "@nestjs/swagger";
import { Status } from "src/statuses/statuses.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tasks {

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Task title', description: 'Название задачи' })
  @Column('varchar', { nullable: true, length: 50 })
  title!: string;

  @ApiProperty({ example: '1', description: 'Номер задачи' })
  @Column('int', { nullable: true })
  order!: number;

  @ManyToOne(() => Status, (status) => status.tasks, { onDelete: 'CASCADE'})
  // @Exclude()
  status: Status;
}
