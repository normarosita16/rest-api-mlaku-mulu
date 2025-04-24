// src/perjalanan/entities/perjalanan.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from '../../users/entities/user.entity';
  
  @Entity()
  export class Perjalanan {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'timestamptz' })
    tanggalMulai: Date;
  
    @Column({ type: 'timestamptz' })
    tanggalBerakhir: Date;
  
    @Column({ type: 'jsonb' }) // fleksibel: string atau object
    destinasi: any;
  
    @ManyToOne(() => User, (user) => user.perjalanan, { onDelete: 'CASCADE' })
    user: User;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ default: 'aktif' }) // atau 'berlangsung'
    status: 'aktif' | 'selesai' | 'dibatalkan' | 'menunggu-pembatalan';

  }
  