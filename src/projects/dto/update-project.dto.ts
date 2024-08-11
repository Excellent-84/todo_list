import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProjectDto {

  @ApiProperty({ example: 'Project title', description: 'Название проекта' })
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Project description', description: 'Название проекта' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  description?: string;
}
