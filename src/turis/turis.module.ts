// src/turis/turis.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurisController } from './turis.controller';
import { TurisService } from './turis.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [TurisController],
  providers: [TurisService],
})
export class TurisModule {}
