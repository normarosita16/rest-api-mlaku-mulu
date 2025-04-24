// src/turis/turis.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UpdateTurisDto } from './dto/update-turis.dto';

@Injectable()
export class TurisService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepo.find({ where: { role: { name: 'turis' } }, relations: ['role'] });
  }

  async findOne(id: string) {
    const user = await this.userRepo.findOne({ where: { id }, relations: ['role'] });
    if (!user || user.role.name !== 'turis') throw new NotFoundException('Turis not found');
    return user;
  }

  async update(id: string, dto: UpdateTurisDto) {
    const user = await this.findOne(id);
    Object.assign(user, dto);
    return this.userRepo.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.userRepo.remove(user);
  }
}
