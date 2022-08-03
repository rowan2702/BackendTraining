import {MigrationInterface, QueryRunner} from "typeorm";

export class addressEntityUpdated1659509937971 implements MigrationInterface {
    name = 'addressEntityUpdated1659509937971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "address" TO "address_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "department_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "joining_date"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "line1" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "line2" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "city" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "state" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "country" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "pincode" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "joining_date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "username" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "department_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address_id" uuid`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "UQ_2a4f5082f1be346e2b8cdec2194" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194" FOREIGN KEY ("address_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "UQ_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "address_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "department_id"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "joining_date"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "pincode"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "line2"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "line1"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "username" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "address_id" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "joining_date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "department_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "address_id" TO "address"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
