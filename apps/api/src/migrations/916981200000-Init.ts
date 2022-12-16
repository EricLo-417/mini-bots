import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1574681382000 implements MigrationInterface {
    name = 'Init1608877782016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shipment" ("id" SERIAL NOT NULL, "label_id" varchar NOT NULL, "shipping_tracking_code" varchar NOT NULL, CONSTRAINT "PK_8ac0d081dbdb7ab02d166bcda9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shipment"`);
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
