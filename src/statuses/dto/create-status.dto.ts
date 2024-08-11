import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateStatusDto {

  @ApiProperty({ example: 'Status title', description: 'Название статуса задачи' })
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  title: string;

  @ApiProperty({ example: '1', description: 'Номер статуса задачи' })
  @Type(() => Number)
  @IsInt({ message: 'Должно быть целым числом' })
  order: number;
}
