import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Perjalanan } from './entities/perjalanan.entity';
import { CreatePerjalananDto } from './dto/create-perjalanan.dto';
import { UpdatePerjalananDto } from './dto/update-perjalanan.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PerjalananService {
  constructor(
    @InjectRepository(Perjalanan)
    private repo: Repository<Perjalanan>,
    private usersService: UsersService,
  ) {}

  async create(dto: CreatePerjalananDto, currentUserId: string) {
    const userId = true && dto.userId ? dto.userId : currentUserId;
    const user = await this.usersService.findOne(userId);
    const perjalanan = this.repo.create({ ...dto, user });
    return this.repo.save(perjalanan);
  }

  async findAllByUser(userId: string) {
    return this.repo.find({
      where: { user: { id: userId } },
      order: { tanggalMulai: 'DESC' },
    });
  }

  async findOne(id: string) {
    const perjalanan = await this.repo.findOne({ where: { id }, relations: ['user'] });
    if (!perjalanan) throw new NotFoundException('Perjalanan not found');
    return perjalanan;
  }

  async update(id: string, dto: UpdatePerjalananDto) {
    const perjalanan = await this.findOne(id);
    Object.assign(perjalanan, dto);
    return this.repo.save(perjalanan);
  }

  async remove(id: string) {
    const perjalanan = await this.findOne(id);
    return this.repo.remove(perjalanan);
  }
}
