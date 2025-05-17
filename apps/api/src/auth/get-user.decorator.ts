import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: User;
}

export const GetUser = createParamDecorator(
  <T = User>(data: string, ctx: ExecutionContext): T => {
    const request: RequestWithUser = ctx.switchToHttp().getRequest();
    if (!request.user) {
      throw new Error('User not found in request');
    }

    return (data ? request.user[data] : request.user) as T;
  },
);
