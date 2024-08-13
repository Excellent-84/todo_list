import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private jwtService: JwtService) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const condidate = await this.userService.getUserByEmail(userDto.email);

    if (condidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST
      )
    }

    const hashPassword = await bcrypt.hash(userDto.password, 10);
    const user = await this.userService.createUser({ ...userDto, password: hashPassword });
    return user;
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);

    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException('Некорректный email или password');
  }
}
