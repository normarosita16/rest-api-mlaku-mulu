// src/common/guards/access.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { ACCESS_KEY } from '../decorators/access.decorator';
  
  @Injectable()
  export class AccessGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredAccess = this.reflector.getAllAndOverride<{ resource: string; action: string }>(
        ACCESS_KEY,
        [context.getHandler(), context.getClass()],
      );
  
      if (!requiredAccess) return true;
  
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      if (!user?.role?.access) return false;
  
      const hasPermission = user.role.access.some(
        (perm) =>
          perm.resource === requiredAccess.resource &&
          perm.action === requiredAccess.action,
      );
  
      if (!hasPermission) {
        throw new ForbiddenException('Akses tidak diizinkan untuk resource ini');
      }
  
      return true;
    }
  }
  