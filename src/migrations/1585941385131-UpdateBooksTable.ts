import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateBooksTable1585941385131 implements MigrationInterface {
    name = 'UpdateBooksTable1585941385131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2"`, undefined);
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "authorId" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2"`, undefined);
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "authorId" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
