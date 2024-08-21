import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateTaskDto {

  @ApiProperty({ example: 'Task title', description: 'Название задачи' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  @MaxLength(50, { message: 'Название задачи не должно превышать 50 символов' })
  readonly title?: string;

  @ApiProperty({ example: 'Task description', description: 'Описание задачи' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  @MaxLength(255, { message: 'Описание задачи не должно превышать 255 символов' })
  readonly description?: string;
}
