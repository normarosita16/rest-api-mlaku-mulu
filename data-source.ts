// data-source.ts
import { DataSource } from 'typeorm';
import { User } from './src/users/entities/user.entity';
import { Role } from './src/roles/entities/role.entity';
import { Perjalanan } from './src/perjalanan/entities/perjalanan.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'rest_api_mlaku_mulu',
  entities: [Role, User, Perjalanan],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
