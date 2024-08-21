import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdateStatusDto {

  @ApiProperty({ example: 'Status title', description: 'Название статуса задачи' })
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  @MaxLength(50, { message: 'Название статуса задачи не должно превышать 50 символов' })
  readonly title: string;
}
