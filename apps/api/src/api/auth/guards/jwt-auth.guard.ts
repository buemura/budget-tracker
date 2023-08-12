/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(_err: any, user: any, _info: any, _context: ExecutionContext) {
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
