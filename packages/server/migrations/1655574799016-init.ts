import { MigrationInterface, QueryRunner } from "typeorm";

export class init1655574799016 implements MigrationInterface {
    name = 'init1655574799016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_product" ("id" varchar PRIMARY KEY NOT NULL, "state" varchar NOT NULL DEFAULT ('DRAFT'), "index" integer, "showInGallery" boolean NOT NULL DEFAULT (0), "showInShop" boolean NOT NULL DEFAULT (0), "price" integer, "createdAt" bigint NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" bigint NOT NULL DEFAULT (CURRENT_TIMESTAMP), "titleRu" varchar NOT NULL, "titleEn" varchar NOT NULL, "descriptionRu" varchar NOT NULL, "descriptionEn" varchar NOT NULL, "coverId" varchar, CONSTRAINT "UQ_11262c7da5897396b412517614f" UNIQUE ("coverId"))`);
        await queryRunner.query(`INSERT INTO "temporary_product"("id", "state", "index", "showInGallery", "showInShop", "price", "createdAt", "updatedAt", "titleRu", "titleEn", "descriptionRu", "descriptionEn", "coverId") SELECT "id", "state", "index", "showInGallery", "showInShop", "price", "createdAt", "updatedAt", "titleRu", "titleEn", "descriptionRu", "descriptionEn", "coverId" FROM "product"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`);
        await queryRunner.query(`CREATE TABLE "temporary_product" ("id" varchar PRIMARY KEY NOT NULL, "state" varchar NOT NULL DEFAULT ('DRAFT'), "showInGallery" boolean NOT NULL DEFAULT (0), "showInShop" boolean NOT NULL DEFAULT (0), "price" integer, "createdAt" bigint NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" bigint NOT NULL DEFAULT (CURRENT_TIMESTAMP), "titleRu" varchar NOT NULL, "titleEn" varchar NOT NULL, "descriptionRu" varchar NOT NULL, "descriptionEn" varchar NOT NULL, "coverId" varchar, CONSTRAINT "UQ_11262c7da5897396b412517614f" UNIQUE ("coverId"))`);
        await queryRunner.query(`INSERT INTO "temporary_product"("id", "state", "showInGallery", "showInShop", "price", "createdAt", "updatedAt", "titleRu", "titleEn", "descriptionRu", "descriptionEn", "coverId") SELECT "id", "state", "showInGallery", "showInShop", "price", "createdAt", "updatedAt", "titleRu", "titleEn", "descriptionRu", "descriptionEn", "coverId" FROM "product"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`);
        await queryRunner.query(`CREATE TABLE "temporary_product" ("id" varchar PRIMARY KEY NOT NULL, "state" varchar NOT NULL DEFAULT (0), "showInGallery" boolean NOT NULL DEFAULT (0), "showInShop" boolean NOT NULL DEFAULT (0), "price" integer, "createdAt" bigint NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" bigint NOT NULL DEFAULT (CURRENT_TIMESTAMP), "titleRu" varchar NOT NULL, "titleEn" varchar NOT NULL, "descriptionRu" varchar NOT NULL, "descriptionEn" varchar NOT NULL, "coverId" varchar, CONSTRAINT "UQ_11262c7da5897396b412517614f" UNIQUE ("coverId"))`);
        await queryRunner.query(`INSERT INTO "temporary_product"("id", "state", "showInGallery", "showInShop", "price", "createdAt", "updatedAt", "titleRu", "titleEn", "descriptionRu", "descriptionEn", "coverId") SELECT "id", "state", "showInGallery", "showInShop", "price", "createdAt", "updatedAt", "titleRu", "titleEn", "descriptionRu", "descriptionEn", "coverId" FROM "product"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`);
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "state" varchar NOT NULL DEFAULT ('DRAFT'), "showInGallery" boolean NOT NULL DEFAULT (0), "showInShop" boolean NOT NULL DEFAULT (0), "price" integer, "createdAt" bigint NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" bigint NOT NULL DEFAULT (CURRENT_TIMESTAMP), "titleRu" varchar NOT NULL, "titleEn" varchar NOT NULL, "descriptionRu" varchar NOT NULL, "descriptionEn" varchar NOT NULL, "coverId" varchar, CONSTRAINT "UQ_11262c7da5897396b412517614f" UNIQUE ("coverId"))`);
        await queryRunner.query(`INSERT INTO "product"("id", "state", "showInGallery", "showInShop", "price", "createdAt", "updatedAt", "titleRu", "titleEn", "descriptionRu", "descriptionEn", "coverId") SELECT "id", "state", "showInGallery", "showInShop", "price", "createdAt", "updatedAt", "titleRu", "titleEn", "descriptionRu", "descriptionEn", "coverId" FROM "temporary_product"`);
        await queryRunner.query(`DROP TABLE "temporary_product"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`);
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "state" varchar NOT NULL DEFAULT ('DRAFT'), "index" integer, "showInGallery" boolean NOT NULL DEFAULT (0), "showInShop" boolean NOT NULL DEFAULT (0), "price" integer, "createdAt" bigint NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" bigint NOT NULL DEFAULT (CURRENT_TIMESTAMP), "titleRu" varchar NOT NULL, "titleEn" varchar NOT NULL, "descriptionRu" varchar NOT NULL, "descriptionEn" varchar NOT NULL, "coverId" varchar, CONSTRAINT "UQ_11262c7da5897396b412517614f" UNIQUE ("coverId"))`);
        await queryRunner.query(`INSERT INTO "product"("id", "state", "showInGallery", "showInShop", "price", "createdAt", "updatedAt", "titleRu", "titleEn", "descriptionRu", "descriptionEn", "coverId") SELECT "id", "state", "showInGallery", "showInShop", "price", "createdAt", "updatedAt", "titleRu", "titleEn", "descriptionRu", "descriptionEn", "coverId" FROM "temporary_product"`);
        await queryRunner.query(`DROP TABLE "temporary_product"`);
        await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`);
        await queryRunner.query(`CREATE TABLE "product" ("id" varchar PRIMARY KEY NOT NULL, "state" varchar NOT NULL DEFAULT ('DRAFT'), "index" integer, "showInGallery" boolean NOT NULL DEFAULT (0), "showInShop" boolean NOT NULL DEFAULT (0), "price" integer, "createdAt" bigint NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" bigint NOT NULL DEFAULT (CURRENT_TIMESTAMP), "titleRu" varchar NOT NULL, "titleEn" varchar NOT NULL, "descriptionRu" varchar NOT NULL, "descriptionEn" varchar NOT NULL, "coverId" varchar, CONSTRAINT "UQ_11262c7da5897396b412517614f" UNIQUE ("coverId"), CONSTRAINT "FK_3d85926a8a4bea53a4960bf2b9a" FOREIGN KEY ("coverId") REFERENCES "picture" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "product"("id", "state", "index", "showInGallery", "showInShop", "price", "createdAt", "updatedAt", "titleRu", "titleEn", "descriptionRu", "descriptionEn", "coverId") SELECT "id", "state", "index", "showInGallery", "showInShop", "price", "createdAt", "updatedAt", "titleRu", "titleEn", "descriptionRu", "descriptionEn", "coverId" FROM "temporary_product"`);
        await queryRunner.query(`DROP TABLE "temporary_product"`);
    }

}
