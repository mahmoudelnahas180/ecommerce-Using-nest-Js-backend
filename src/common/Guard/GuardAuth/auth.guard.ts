import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
interface JwtPayload {
  email: string;
  name: string;
  role: string;
  id: string;
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }
    const [type, token] = authHeader.split(' ') ?? [];
    if (type !== 'Bearer') {
      throw new UnauthorizedException('Invalid Authorization Header');
    }
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      request['user'] = { ...payload };
    } catch (err: unknown) {
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }
}
