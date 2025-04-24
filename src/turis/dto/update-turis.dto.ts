// src/turis/dto/update-turis.dto.ts
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateTurisDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
