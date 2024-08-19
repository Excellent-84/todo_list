import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class MoveTaskDto {

  @ApiProperty({ example: '1', description: 'Номер задачи' })
  @Type(() => Number)
  @IsInt({ message: 'Должно быть целым числом' })
  @Min(1, { message: 'Должно быть больше 0' })
  @IsOptional()
  order?: number;

  @ApiProperty({ example: '1', description: 'Номер статуса задачи' })
  @Type(() => Number)
  @IsInt({ message: 'Должно быть целым числом' })
  @Min(1, { message: 'Должно быть больше 0' })
  @IsOptional()
  statusId?: number;
}
