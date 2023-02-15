import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

export const enum Role {
  User = 'user',
  Admin = 'admin',
}

const ROLES_KEY = 'roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    const userRequest = context.switchToHttp().getRequest();
    const userRole = String(userRequest.headers.roles);
    return requireRoles.includes(userRole);
  }
}

export const RequireRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
