import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class MoveStatusDto {

  @ApiProperty({ example: '1', description: 'Номер статуса задачи' })
  @Type(() => Number)
  @IsInt({ message: 'Должно быть целым числом' })
  @Min(1, { message: 'Должно быть больше 0' })
  order: number;
}
