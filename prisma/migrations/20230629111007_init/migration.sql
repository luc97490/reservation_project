/*
  Warnings:

  - The primary key for the `attributionpermanente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `attributionponctuelle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `materiel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `reservationponctuelle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `specifications` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `firstName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `user` table. All the data in the column will be lost.
  - Added the required column `userIdClerk` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `attributionpermanente` DROP FOREIGN KEY `AttributionPermanente_materielId_fkey`;

-- DropForeignKey
ALTER TABLE `attributionpermanente` DROP FOREIGN KEY `AttributionPermanente_userId_fkey`;

-- DropForeignKey
ALTER TABLE `attributionponctuelle` DROP FOREIGN KEY `AttributionPonctuelle_courtId_fkey`;

-- DropForeignKey
ALTER TABLE `attributionponctuelle` DROP FOREIGN KEY `AttributionPonctuelle_materielId_fkey`;

-- DropForeignKey
ALTER TABLE `materiel` DROP FOREIGN KEY `Materiel_specsId_fkey`;

-- DropForeignKey
ALTER TABLE `reservationponctuelle` DROP FOREIGN KEY `ReservationPonctuelle_userId_fkey`;

-- AlterTable
ALTER TABLE `attributionpermanente` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `materielId` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `attributionponctuelle` DROP PRIMARY KEY,
    MODIFY `courtId` VARCHAR(191) NOT NULL,
    MODIFY `materielId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`courtId`, `materielId`);

-- AlterTable
ALTER TABLE `materiel` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `specsId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `reservationponctuelle` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `specifications` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `firstName`,
    DROP COLUMN `image`,
    DROP COLUMN `lastName`,
    ADD COLUMN `userIdClerk` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Materiel` ADD CONSTRAINT `Materiel_specsId_fkey` FOREIGN KEY (`specsId`) REFERENCES `Specifications`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationPonctuelle` ADD CONSTRAINT `ReservationPonctuelle_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttributionPonctuelle` ADD CONSTRAINT `AttributionPonctuelle_courtId_fkey` FOREIGN KEY (`courtId`) REFERENCES `ReservationPonctuelle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttributionPonctuelle` ADD CONSTRAINT `AttributionPonctuelle_materielId_fkey` FOREIGN KEY (`materielId`) REFERENCES `Materiel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttributionPermanente` ADD CONSTRAINT `AttributionPermanente_materielId_fkey` FOREIGN KEY (`materielId`) REFERENCES `Materiel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttributionPermanente` ADD CONSTRAINT `AttributionPermanente_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
