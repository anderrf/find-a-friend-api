/*
  Warnings:

  - You are about to drop the `PetPhoto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PetRequirement` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `organization_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "organization_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "PetPhoto";

-- DropTable
DROP TABLE "PetRequirement";

-- CreateTable
CREATE TABLE "petPhotos" (
    "id" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "petPhotos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "petRequirements" (
    "id" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "petRequirements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "petPhotos" ADD CONSTRAINT "petPhotos_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "petRequirements" ADD CONSTRAINT "petRequirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
