import { ApiProperty, OmitType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";

export class TokenResponse {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5c...', description: 'Токен' })
  token: string;
}

export class LoginUserDto extends OmitType(CreateUserDto, ['name'] as const) {}
