import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Perjalanan } from './entities/perjalanan.entity';
import { CreatePerjalananDto } from './dto/create-perjalanan.dto';
import { UpdatePerjalananDto } from './dto/update-perjalanan.dto';
import { UsersService } from '../users/users.service';
import { Between, LessThan, MoreThan } from 'typeorm';

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

  async findAllByUser(userId: string, status?: string) {
    const now = new Date();
  
    let whereClause: any = {
      user: { id: userId },
    };
  
    if (status === 'berlangsung') {
      whereClause.tanggalMulai = LessThan(now);
      whereClause.tanggalBerakhir = MoreThan(now);
    } else if (status === 'selesai') {
      whereClause.tanggalBerakhir = LessThan(now);
    } else if (status === 'mendatang') {
      whereClause.tanggalMulai = MoreThan(now);
    }
  
    return this.repo.find({
      where: whereClause,
      order: { tanggalMulai: 'DESC' },
      relations: ['user'],
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

  async findUpcomingPerjalanan() {
    const now = new Date();
    const threeDays = new Date();
    threeDays.setDate(now.getDate() + 3);
  
    return this.repo.find({
      where: {
        tanggalMulai: Between(now, threeDays), 
      },
      relations: ['user'],
    });
  }

async getRekomendasiDestinasi() {
  const perjalananList = await this.repo.find(); // bisa tambahkan filter waktu jika perlu

  const countMap = new Map<string, number>();

  for (const p of perjalananList) {
    let destinasiStr = '';

    if (typeof p.destinasi === 'string') {
      destinasiStr = p.destinasi;
    } else if (typeof p.destinasi === 'object') {
      // ambil kota atau gabungan jika kompleks
      destinasiStr = p.destinasi.kota ?? JSON.stringify(p.destinasi);
    }

    if (destinasiStr) {
      countMap.set(destinasiStr, (countMap.get(destinasiStr) || 0) + 1);
    }
  }

  // Ubah ke array dan urutkan dari yang terbanyak
  const result = Array.from(countMap.entries())
    .map(([destinasi, count]) => ({ destinasi, count }))
    .sort((a, b) => b.count - a.count);

  return result;
}

async requestCancel(perjalananId: string, userId: string) {
  const perjalanan = await this.repo.findOne({
    where: { id: perjalananId },
    relations: ['user'],
  });

  if (!perjalanan) throw new NotFoundException('Perjalanan tidak ditemukan');
  if (perjalanan.user.id !== userId) throw new ForbiddenException('Bukan milik Anda');
  if (perjalanan.status === 'selesai') throw new BadRequestException('Perjalanan sudah selesai');

  perjalanan.status = 'menunggu-pembatalan';
  return this.repo.save(perjalanan);
}

async getPerjalananWithCancelRequest() {
  return this.repo.find({
    where: { status: 'menunggu-pembatalan' },
    relations: ['user'],
  });
}

async approveCancel(id: string) {
  const perjalanan = await this.repo.findOneBy({ id });
  if (!perjalanan) throw new NotFoundException('Perjalanan tidak ditemukan');
  if (perjalanan.status !== 'menunggu-pembatalan') {
    throw new BadRequestException('Perjalanan ini tidak dalam status menunggu pembatalan');
  }

  perjalanan.status = 'dibatalkan';
  return this.repo.save(perjalanan);
}

async rejectCancel(id: string) {
  const perjalanan = await this.repo.findOneBy({ id });
  if (!perjalanan) throw new NotFoundException('Perjalanan tidak ditemukan');
  if (perjalanan.status !== 'menunggu-pembatalan') {
    throw new BadRequestException('Perjalanan ini tidak dalam status menunggu pembatalan');
  }

  perjalanan.status = 'aktif';
  return this.repo.save(perjalanan);
}


async findPerjalananYangHarusDiselesaikan() {
  const now = new Date();
  return this.repo.find({
    where: {
      status: 'aktif',
      tanggalBerakhir: LessThan(now),
    },
  });
}

async tandaiSelesai(id: string) {
  const perjalanan = await this.repo.findOneBy({ id });
  if (perjalanan) {
    perjalanan.status = 'selesai';
    return this.repo.save(perjalanan);
  }
}




  
}
