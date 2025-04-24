// src/roles/entities/role-access.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class RoleAccess {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Role, (role) => role.access, { onDelete: 'CASCADE' })
  role: Role;

  @Column()
  resource: string;

  @Column()
  action: string;
}
