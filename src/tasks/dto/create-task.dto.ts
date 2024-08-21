import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateTaskDto {

  @ApiProperty({ example: 'Task title', description: 'Название задачи' })
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  @MaxLength(50, { message: 'Название задачи не должно превышать 50 символов' })
  readonly title: string;

  @ApiProperty({ example: 'Title description', description: 'Описание задачи' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  @MaxLength(255, { message: 'Описание задачи не должно превышать 255 символов' })
  readonly description?: string;
}
