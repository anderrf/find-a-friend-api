/*
  Warnings:

  - You are about to drop the column `State` on the `organizations` table. All the data in the column will be lost.
  - Added the required column `responsible_name` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "State",
ADD COLUMN     "responsible_name" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
