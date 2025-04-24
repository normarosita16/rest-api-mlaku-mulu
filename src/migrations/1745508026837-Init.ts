import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1745508026837 implements MigrationInterface {
    name = 'Init1745508026837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "perjalanan" ADD "status" character varying NOT NULL DEFAULT 'aktif'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "perjalanan" DROP COLUMN "status"`);
    }

}
