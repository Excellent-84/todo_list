import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {

  @ApiProperty({ example: 'john@example.com', description: 'Почтовый адрес' })
  @IsEmail({}, { message: 'Некорректный email' })
  @IsString({ message: 'Должно быть строкой' })
  readonly email: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(8, 16, { message: 'Не меньше 8 и не больше 16 символов' })
  readonly password: string;

  @ApiProperty({ example: 'John', description: 'Имя пользователя' })
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;
}
