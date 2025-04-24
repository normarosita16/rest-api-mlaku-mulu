import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerjalananController } from './perjalanan.controller';
import { PerjalananService } from './perjalanan.service';
import { Perjalanan } from './entities/perjalanan.entity';
import { UsersModule } from '../users/users.module';
import { PerjalananScheduler } from './perjalanan.scheduler';

@Module({
  imports: [TypeOrmModule.forFeature([Perjalanan]), UsersModule],
  controllers: [PerjalananController],
  providers: [PerjalananService, PerjalananScheduler],
})
export class PerjalananModule {}
