/*
  Warnings:

  - A unique constraint covering the columns `[mobile_phone_number]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mobile_phone_number` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "mobile_phone_number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "organizations_mobile_phone_number_key" ON "organizations"("mobile_phone_number");
