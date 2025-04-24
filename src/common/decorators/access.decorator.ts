// src/common/decorators/access.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ACCESS_KEY = 'access';
export const Access = (resource: string, action: string) =>
  SetMetadata(ACCESS_KEY, { resource, action });
