// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../roles/entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,

    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const role = await this.roleRepo.findOneBy({ id: dto.roleId });
    if (!role) throw new Error('Role tidak ditemukan');

    const user = this.usersService.createUser({
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: role,
      });
      
      await this.usersService.save(user);

    return { message: 'Register success', user };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, role: user.role.name };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
