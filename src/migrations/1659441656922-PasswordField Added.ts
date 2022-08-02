import {MigrationInterface, QueryRunner} from "typeorm";

export class PasswordFieldAdded1659441656922 implements MigrationInterface {
    name = 'PasswordFieldAdded1659441656922'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}
