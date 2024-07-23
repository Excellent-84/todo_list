import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {

  @ApiProperty({ example: 'john@example.com', description: 'Почтовый адрес' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'John', description: 'Имя пользователя' })
  @IsOptional()
  @IsString()
  name?: string;
}
