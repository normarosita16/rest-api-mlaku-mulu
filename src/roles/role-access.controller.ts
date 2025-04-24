import { Controller, Post, Body, Get, Query, Put, Param } from '@nestjs/common';
import { RoleAccessService } from './role-access.service';
import { CreateRoleAccessDto } from './dto/create-role-access.dto';
import { UpdateRoleAccessDto } from './dto/update-role-access.dto';

@Controller('role-access')
export class RoleAccessController {
  constructor(private readonly service: RoleAccessService) {}

  @Post()
  create(@Body() dto: CreateRoleAccessDto) {
    return this.service.create(dto);
  }

  @Get()
  find(@Query('role') role: string, @Query('resource') resource: string) {
    return this.service.findByRoleAndResource(role, resource);
  }

  @Get('all')
findAll() {
  return this.service.findAll();
}

@Put(':id')
update(@Param('id') id: string, @Body() dto: UpdateRoleAccessDto) {
  return this.service.update(id, dto);
}

}
