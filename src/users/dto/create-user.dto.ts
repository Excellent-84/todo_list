import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {

  @ApiProperty({ example: 'john@example.com', description: 'Почтовый адрес' })
  @IsNotEmpty({ message: 'Введите email' })
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @IsNotEmpty({ message: 'Введите password' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(8, 16, { message: 'Не меньше 8 и не больше 16 символов' })
  password: string;

  @ApiProperty({ example: 'John', description: 'Имя пользователя' })
  @IsNotEmpty({ message: 'Введите имя' })
  @IsString({ message: 'Должно быть строкой' })
  name: string;
}
