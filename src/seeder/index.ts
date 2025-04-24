import { AppDataSource } from '../../data-source';
import { seedRoleAccess } from './role-access.seed';

AppDataSource.initialize().then(async (ds) => {
  await seedRoleAccess(ds);
  process.exit(0);
});
