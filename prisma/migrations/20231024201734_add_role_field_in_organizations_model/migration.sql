/*
  Warnings:

  - Added the required column `age` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'ORG';

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "age" INTEGER NOT NULL;
