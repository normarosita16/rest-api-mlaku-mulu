import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePerjalananDto {
  @IsDateString()
  tanggalMulai: string;

  @IsDateString()
  tanggalBerakhir: string;

  @IsNotEmpty()
  destinasi: string | object;

  @IsOptional()
  userId?: string; // hanya dipakai admin atau pegawai
}
