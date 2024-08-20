import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateProjectDto {

  @ApiProperty({ example: 'Project title', description: 'Название проекта' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Project description', description: 'Название проекта' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  description?: string;
}
