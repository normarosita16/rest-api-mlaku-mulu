import {
  Controller, Get, Post, Patch, Delete, Param, Body,
  UseGuards, Request, Query,
  Put
} from '@nestjs/common';
import { PerjalananService } from './perjalanan.service';
import { CreatePerjalananDto } from './dto/create-perjalanan.dto';
import { UpdatePerjalananDto } from './dto/update-perjalanan.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AccessGuard } from '../common/guards/access.guard';
import { Access } from '../common/decorators/access.decorator';

@Controller('perjalanan')
@UseGuards(JwtAuthGuard, AccessGuard)
export class PerjalananController {
  constructor(private readonly service: PerjalananService) {}

  @Post()
  @Access('perjalanan', 'create')
  create(@Body() dto: CreatePerjalananDto, @Request() req) {
    return this.service.create(dto, req.user.id);
  }

  @Get('me')
  @Access('perjalanan', 'view_own')
  getOwn(@Request() req) {
    return this.service.findAllByUser(req.user.id);
  }

  @Get('user/:userId')
@Access('perjalanan', 'read')
getByUser(
  @Param('userId') userId: string,
  @Query('status') status?: string,
) {
  return this.service.findAllByUser(userId, status);
}


  @Put(':id')
  @Access('perjalanan', 'update')
  update(@Param('id') id: string, @Body() dto: UpdatePerjalananDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Access('perjalanan', 'delete')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

@UseGuards(JwtAuthGuard, AccessGuard)
@Access('perjalanan', 'read')
@Get('rekomendasi')
getRekomendasiDestinasi() {
  return this.service.getRekomendasiDestinasi();
}

@UseGuards(JwtAuthGuard, AccessGuard)
@Access('perjalanan', 'update')
@Put(':id/request-cancel')
requestCancel(@Param('id') id: string, @Request() req) {
  return this.service.requestCancel(id, req.user.id);
}

@UseGuards(JwtAuthGuard, AccessGuard)
@Access('perjalanan', 'read-any')
@Get('pembatalan')
getCancelRequests() {
  return this.service.getPerjalananWithCancelRequest();
}


@UseGuards(JwtAuthGuard, AccessGuard)
@Access('perjalanan', 'update')
@Patch(':id/approve-cancel')
approveCancel(@Param('id') id: string) {
  return this.service.approveCancel(id);
}

@UseGuards(JwtAuthGuard, AccessGuard)
@Access('perjalanan', 'update')
@Patch(':id/reject-cancel')
rejectCancel(@Param('id') id: string) {
  return this.service.rejectCancel(id);
}


}
