import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1745494773013 implements MigrationInterface {
    name = 'Init1745494773013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role_access" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "resource" character varying NOT NULL, "action" character varying NOT NULL, "roleId" uuid, CONSTRAINT "PK_d53bf5646eeebac0ed7665061ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "role_access" ADD CONSTRAINT "FK_22f7449755b215241996e12f018" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_access" DROP CONSTRAINT "FK_22f7449755b215241996e12f018"`);
        await queryRunner.query(`DROP TABLE "role_access"`);
    }

}
