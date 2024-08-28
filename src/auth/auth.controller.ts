import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto, TokenResponse } from '../users/dto/login-user.dto';
import { User } from '../users/users.entity';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 201, type: User })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto): Promise<User> {
    return this.authService.registration(userDto);
  }

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200, type: TokenResponse })
  @Post('/login')
  login(@Body() userDto: LoginUserDto): Promise<TokenResponse> {
    return this.authService.login(userDto);
  }
}
