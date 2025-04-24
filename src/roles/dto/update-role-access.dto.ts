// src/roles/dto/update-role-access.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class UpdateRoleAccessDto {
  @IsOptional()
  @IsString()
  resource?: string;

  @IsOptional()
  @IsString()
  action?: string;
}
