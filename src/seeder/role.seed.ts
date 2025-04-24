import { DataSource } from 'typeorm';
import { Role } from '../roles/entities/role.entity';

export const seedRoles = async (dataSource: DataSource) => {
  const roleRepo = dataSource.getRepository(Role);

  const roles = ['turis', 'pegawai'];

  for (const name of roles) {
    const existing = await roleRepo.findOneBy({ name });
    if (!existing) {
      await roleRepo.save(roleRepo.create({ name }));
      console.log(`✅ Role "${name}" berhasil ditambahkan`);
    } else {
      console.log(`⚠️ Role "${name}" sudah ada`);
    }
  }
};
