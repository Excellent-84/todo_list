// import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// export const CurrentUser = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     return request.user;
//   },
// );

import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/users.entity'; // Импортируйте User

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as User; // Должен быть User
    if (!user) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }
      return user;
    },
   );
