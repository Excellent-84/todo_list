import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateTaskDto {

  @ApiProperty({ example: 'Task title', description: 'Название задачи' })
  @IsString({ message: 'Должно быть строкой' })
  title?: string;

  @ApiProperty({ example: 'Task description', description: 'Описание задачи' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '1', description: 'Номер задачи' })
  @Type(() => Number)
  @IsInt({ message: 'Должно быть целым числом' })
  order?: number;
}