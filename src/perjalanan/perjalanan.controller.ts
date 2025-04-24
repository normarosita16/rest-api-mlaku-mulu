import {
    Controller, Get, Post, Patch, Delete, Param, Body,
    UseGuards, Request
  } from '@nestjs/common';
  import { PerjalananService } from './perjalanan.service';
  import { CreatePerjalananDto } from './dto/create-perjalanan.dto';
  import { UpdatePerjalananDto } from './dto/update-perjalanan.dto';
  import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
  import { RolesGuard } from '../common/guards/roles.guard';
  import { Roles } from '../common/decorators/roles.decorator';
  
  @Controller('perjalanan')
  @UseGuards(JwtAuthGuard, RolesGuard)
  export class PerjalananController {
    constructor(private readonly service: PerjalananService) {}
  
    @Post()
    @Roles('pegawai', 'turis')
    create(@Body() dto: CreatePerjalananDto, @Request() req) {
      const isPegawai = req.user.role === 'pegawai';
      return this.service.create(dto, req.user.id, isPegawai);
    }
  
    @Get('me')
    @Roles('turis')
    getOwn(@Request() req) {
      return this.service.findAllByUser(req.user.id);
    }
  
    @Get('user/:userId')
    @Roles('pegawai')
    getByUser(@Param('userId') userId: string) {
      return this.service.findAllByUser(userId);
    }
  
    @Patch(':id')
    @Roles('pegawai')
    update(@Param('id') id: string, @Body() dto: UpdatePerjalananDto) {
      return this.service.update(id, dto);
    }
  
    @Delete(':id')
    @Roles('pegawai')
    remove(@Param('id') id: string) {
      return this.service.remove(id);
    }
  }
  