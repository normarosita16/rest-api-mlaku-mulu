// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PerjalananModule } from './perjalanan/perjalanan.module';
import { User } from './users/entities/user.entity';
import { Perjalanan } from './perjalanan/entities/perjalanan.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'rest_api_mlaku_mulu',
      entities: [User, Perjalanan],
      synchronize: true, // ganti false di production
    }),
    AuthModule,
    UsersModule,
    PerjalananModule,
  ],
})
export class AppModule {}
