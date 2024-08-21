import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class ParamsProjectDto {

  @ApiProperty({ description: 'ID проекта', type: Number })
  @Type(() => Number)
  @IsInt({ message: 'Должно быть целым числом' })
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  readonly projectId: number;
}
