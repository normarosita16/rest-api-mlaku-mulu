import {
  Controller, Get, Param, Patch, Delete, Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AccessGuard } from '../common/guards/access.guard';
import { Access } from '../common/decorators/access.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, AccessGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Access('user', 'read')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Access('user', 'read')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Access('user', 'update')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @Access('user', 'delete')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
