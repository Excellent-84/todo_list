import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateStatusDto {

  @ApiProperty({ example: 'Status title', description: 'Название статуса задачи' })
  @IsString({ message: 'Должно быть строкой' })
  title: string;
}
