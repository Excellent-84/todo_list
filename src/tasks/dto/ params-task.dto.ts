import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ParamsStatusDto } from '../../statuses/dto/params-status.dto';

export class ParamsTaskDto extends ParamsStatusDto {

  @ApiProperty({ description: 'ID статуса', type: Number })
  @Type(() => Number)
  @IsInt({ message: 'Должно быть целым числом' })
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  readonly taskId: number;
}
