import { AppDataSource } from '../../data-source';
import { seedRoles } from './role.seed';
import { seedRoleAccess } from './role-access.seed';

AppDataSource.initialize()
  .then(async (dataSource) => {
    console.log('🔧 Seeding dimulai...');
    await seedRoles(dataSource);
    await seedRoleAccess(dataSource);
    console.log('🎉 Seeding selesai!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding gagal:', error);
    process.exit(1);
  });
