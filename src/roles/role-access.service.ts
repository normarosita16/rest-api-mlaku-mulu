import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleAccess } from './entities/role-access.entity';
import { CreateRoleAccessDto } from './dto/create-role-access.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleAccessService {
  constructor(
    @InjectRepository(RoleAccess)
    private repo: Repository<RoleAccess>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) {}

  async create(dto: CreateRoleAccessDto) {
    const role = await this.roleRepo.findOneBy({ id: dto.roleId });
    if (!role) {
      throw new Error('Role tidak ditemukan');
    }
  
    const access = this.repo.create({
      role: role,
      resource: dto.resource,
      action: dto.action,
    });
  
    return this.repo.save(access);
  }
  

  findByRoleAndResource(roleName: string, resource: string) {
    return this.repo
      .createQueryBuilder('access')
      .leftJoinAndSelect('access.role', 'role')
      .where('role.name = :roleName AND access.resource = :resource', { roleName, resource })
      .getMany();
  }

  async findAll() {
    return this.repo.find({
      relations: ['role'],
      order: { role: { name: 'ASC' } },
    });
  }
  
}
