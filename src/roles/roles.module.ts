import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';
import { RoleAccess } from './entities/role-access.entity';
import { RoleAccessService } from './role-access.service';
import { RoleAccessController } from './role-access.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RoleAccess])],
  controllers: [RolesController, RoleAccessController],
  providers: [RolesService, RoleAccessService],
  exports: [RolesService, RoleAccessService],
})
export class RolesModule {}
