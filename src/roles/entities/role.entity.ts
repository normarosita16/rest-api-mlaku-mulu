// src/roles/entities/role.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string; // contoh: "pegawai", "turis", "admin", etc

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
