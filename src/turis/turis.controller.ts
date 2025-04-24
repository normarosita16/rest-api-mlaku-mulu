import {
  Controller, Get, Param, Patch, Delete, Body, UseGuards, Put
} from '@nestjs/common';
import { TurisService } from './turis.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AccessGuard } from '../common/guards/access.guard';
import { Access } from '../common/decorators/access.decorator';
import { UpdateTurisDto } from './dto/update-turis.dto';

@Controller('turis')
@UseGuards(JwtAuthGuard, AccessGuard)
export class TurisController {
  constructor(private readonly turisService: TurisService) {}

  @Get()
  @Access('turis', 'read')
  findAll() {
    return this.turisService.findAll();
  }

  @Get(':id')
  @Access('turis', 'read')
  findOne(@Param('id') id: string) {
    return this.turisService.findOne(id);
  }

  @Put(':id')
  @Access('turis', 'update')
  update(@Param('id') id: string, @Body() dto: UpdateTurisDto) {
    return this.turisService.update(id, dto);
  }

  @Delete(':id')
  @Access('turis', 'delete')
  remove(@Param('id') id: string) {
    return this.turisService.remove(id);
  }
}
