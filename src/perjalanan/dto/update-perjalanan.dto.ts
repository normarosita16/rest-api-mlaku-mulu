import { IsDateString, IsOptional } from 'class-validator';

export class UpdatePerjalananDto {
  @IsOptional()
  @IsDateString()
  tanggalMulai?: string;

  @IsOptional()
  @IsDateString()
  tanggalBerakhir?: string;

  @IsOptional()
  destinasi?: string | object;
}
