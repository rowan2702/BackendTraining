import {MigrationInterface, QueryRunner} from "typeorm";

export class modifiedEmployeeSchema1659405470603 implements MigrationInterface {
    name = 'modifiedEmployeeSchema1659405470603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "address" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "address" SET NOT NULL`);
    }

}
