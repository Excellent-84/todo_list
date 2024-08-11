import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {

  @ApiProperty({ example: 'Task title', description: 'Название задачи' })
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  title: string;

  @ApiProperty({ example: 'Title description', description: 'Описание задачи' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '1', description: 'Номер задачи' })
  @Type(() => Number)
  @IsInt({ message: 'Должно быть целым числом' })
  order: number;
}
