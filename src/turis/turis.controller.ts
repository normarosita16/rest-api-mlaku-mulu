// src/turis/turis.controller.ts
import { Controller, Get, Param, Patch, Delete, Body, UseGuards } from '@nestjs/common';
import { TurisService } from './turis.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UpdateTurisDto } from './dto/update-turis.dto';

@Controller('turis')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('pegawai')
export class TurisController {
  constructor(private readonly turisService: TurisService) {}

  @Get()
  findAll() {
    return this.turisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turisService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTurisDto) {
    return this.turisService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.turisService.remove(id);
  }
}
