import {MigrationInterface, QueryRunner} from "typeorm";

export class addressUpdate1659510125266 implements MigrationInterface {
    name = 'addressUpdate1659510125266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`CREATE TABLE "address" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "line1" character varying, "line2" character varying, "city" character varying, "state" character varying, "country" character varying, "pincode" character varying, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "line1"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "line2"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "pincode"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "pincode" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "country" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "state" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "city" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "line2" character varying`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "line1" character varying`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_2a4f5082f1be346e2b8cdec2194" FOREIGN KEY ("address_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
