import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtWrapperService } from '../services/jwt-wrapper.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtWrapperService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!('authorization' in req.headers && req.headers.authorization)) {
      throw new UnauthorizedException();
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedJwt = this.jwtService.decodeWithAccessToken(token);
    if (!decodedJwt.isValid) {
      throw new UnauthorizedException();
    }
    req.body.decodedJwt = decodedJwt.data;
    return true;
  }
}
