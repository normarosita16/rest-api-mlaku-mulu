<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


## Project setup

```bash
$ npm install
```

## 🚀 Teknologi
- **NestJS** + **TypeScript**
- **TypeORM** (PostgreSQL)
- **JWT Authentication**
- **RBAC & Role Access (Permission-based)**
- **Scheduler** (`@nestjs/schedule`)

💡 Wajib dilakukan sebelum menjalankan aplikasi

# Generate database schema
npm run typeorm migration:run

# Jalankan seed data (role, role_access)
npm run seed

# Jalankan project
npm run start

Untuk fitur fitur yang tersedia :
- Authentication : login, register
- Management User : create, update, delete, getall, getone
- Management turis : create, update, delete, getall, getone
- Management Role & Role Access : create, update, getall
- Management Perjalanan : create, get perjalanan me, riwayat perjalanan dengan filter status, update perjalanan, delete, rekomendasi destinasi populer, request cancel perjalanan dari turis, approve / reject request dari pegawai
- notifikasi perjalanan yg akan datang ke turis dengan scheduler

