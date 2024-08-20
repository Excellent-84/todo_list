import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class LoginUserDto {

  @ApiProperty({ example: 'john@example.com', description: 'Почтовый адрес' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(8, 16, { message: 'Не меньше 8 и не больше 16 символов' })
  readonly password: string;
}
