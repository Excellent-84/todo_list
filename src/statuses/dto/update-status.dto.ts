import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsString } from "class-validator";

export class UpdateStatusDto {

  @ApiProperty({ example: 'Status title', description: 'Название статуса задачи' })
  @IsString({ message: 'Должно быть строкой' })
  title?: string;

  @ApiProperty({ example: '1', description: 'Номер столбца статуса задачи' })
  @Type(() => Number)
  @IsInt({ message: 'Должно быть целым числом' })
  order?: number;
}