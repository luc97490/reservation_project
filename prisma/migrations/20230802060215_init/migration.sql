/*
  Warnings:

  - You are about to drop the column `commentaire` on the `attributionponctuelle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `attributionponctuelle` DROP COLUMN `commentaire`,
    ADD COLUMN `remarque` VARCHAR(191) NULL;
