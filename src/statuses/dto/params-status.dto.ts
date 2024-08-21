import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ParamsProjectDto } from '../../projects/dto/params-project.dto';

export class ParamsStatusDto extends ParamsProjectDto {

  @ApiProperty({ description: 'ID статуса', type: Number })
  @Type(() => Number)
  @IsInt({ message: 'Должно быть целым числом' })
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  readonly statusId: number;
}
