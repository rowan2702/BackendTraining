import {MigrationInterface, QueryRunner} from "typeorm";

export class UsernameFieldAdded1659443014414 implements MigrationInterface {
    name = 'UsernameFieldAdded1659443014414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "username" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "username"`);
    }

}
