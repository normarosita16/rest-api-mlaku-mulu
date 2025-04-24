import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { RoleAccessService } from './role-access.service';
import { CreateRoleAccessDto } from './dto/create-role-access.dto';

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
}
