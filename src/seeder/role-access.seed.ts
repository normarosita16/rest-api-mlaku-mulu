import { DataSource } from 'typeorm';
import { RoleAccess } from '../roles/entities/role-access.entity';
import { Role } from '../roles/entities/role.entity';

export const seedRoleAccess = async (dataSource: DataSource) => {
  const roleRepo = dataSource.getRepository(Role);
  const accessRepo = dataSource.getRepository(RoleAccess);

  const roles = await roleRepo.find(); // ambil semua role yang sudah dibuat
  const roleMap = Object.fromEntries(roles.map((r) => [r.name, r]));

  const accessData = [
    { role: roleMap['turis'], resource: 'perjalanan', action: 'view_own' },
    { role: roleMap['turis'], resource: 'perjalanan', action: 'update' },
    { role: roleMap['turis'], resource: 'turis', action: 'update' },
    { role: roleMap['pegawai'], resource: 'perjalanan', action: 'create' },
    { role: roleMap['pegawai'], resource: 'perjalanan', action: 'update' },
    { role: roleMap['pegawai'], resource: 'perjalanan', action: 'delete' },
    { role: roleMap['pegawai'], resource: 'turis', action: 'read' },
    { role: roleMap['pegawai'], resource: 'turis', action: 'update' },
    { role: roleMap['pegawai'], resource: 'turis', action: 'delete' },
    { role: roleMap['pegawai'], resource: 'turis', action: 'create' },
    { role: roleMap['pegawai'], resource: 'user', action: 'read' },
    { role: roleMap['pegawai'], resource: 'user', action: 'update' },
    { role: roleMap['pegawai'], resource: 'user', action: 'delete' },
    { role: roleMap['pegawai'], resource: 'user', action: 'create' },
    { role: roleMap['admin'], resource: 'role-access', action: 'create' },
  ];

  const seed = accessRepo.create(accessData);
  await accessRepo.save(seed);

  console.log('✅ role_access seeded');
};
