import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateProjectDto {

  @ApiProperty({ example: 'Project title', description: 'Название проекта' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  @MaxLength(50, { message: 'Название проекта не должно превышать 50 символов' })
  readonly title?: string;

  @ApiProperty({ example: 'Project description', description: 'Название проекта' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  @MaxLength(255, { message: 'Описание проекта не должно превышать 255 символов' })
  readonly description?: string;
}
