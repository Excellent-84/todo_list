import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateTaskDto {

  @ApiProperty({ example: 'Task title', description: 'Название задачи' })
  @IsString({ message: 'Должно быть строкой' })
  title?: string;

  @ApiProperty({ example: 'Task description', description: 'Описание задачи' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  description?: string;
}