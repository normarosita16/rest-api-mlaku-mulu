// src/users/dto/create-user.dto.ts
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsUUID()
  roleId: string;
}
