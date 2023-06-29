/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `attributionponctuelle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `attributionponctuelle` DROP COLUMN `assignedAt`,
    ADD COLUMN `dateattribuer` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `daterendu` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `reservationponctuelle` ADD COLUMN `commentaire` VARCHAR(191) NULL;
