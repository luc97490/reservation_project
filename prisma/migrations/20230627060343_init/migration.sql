/*
  Warnings:

  - You are about to drop the column `caractId` on the `materiel` table. All the data in the column will be lost.
  - You are about to drop the `attributionmaterielcourt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `caractmateriel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reservationcourtterme` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reservationlongterme` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `specsId` to the `Materiel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `attributionmaterielcourt` DROP FOREIGN KEY `AttributionMaterielCourt_courtId_fkey`;

-- DropForeignKey
ALTER TABLE `attributionmaterielcourt` DROP FOREIGN KEY `AttributionMaterielCourt_materielId_fkey`;

-- DropForeignKey
ALTER TABLE `materiel` DROP FOREIGN KEY `Materiel_caractId_fkey`;

-- DropForeignKey
ALTER TABLE `reservationlongterme` DROP FOREIGN KEY `ReservationLongTerme_materielId_fkey`;

-- AlterTable
ALTER TABLE `materiel` DROP COLUMN `caractId`,
    ADD COLUMN `specsId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `attributionmaterielcourt`;

-- DropTable
DROP TABLE `caractmateriel`;

-- DropTable
DROP TABLE `reservationcourtterme`;

-- DropTable
DROP TABLE `reservationlongterme`;

-- CreateTable
CREATE TABLE `Specifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `modele` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReservationPonctuelle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `objet` VARCHAR(191) NOT NULL,
    `lieu` VARCHAR(191) NOT NULL,
    `debut` DATETIME(3) NOT NULL,
    `fin` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AttributionPonctuelle` (
    `courtId` INTEGER NOT NULL,
    `materielId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `rendu` BOOLEAN NOT NULL,

    PRIMARY KEY (`courtId`, `materielId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AttributionPermanente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `materielId` INTEGER NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `dateAttribution` DATETIME(3) NOT NULL,
    `preparateur` VARCHAR(191) NOT NULL,
    `rendu` BOOLEAN NOT NULL,
    `dateRendu` DATETIME(3) NULL,
    `observation` VARCHAR(191) NULL,
    `recuperateur` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Materiel` ADD CONSTRAINT `Materiel_specsId_fkey` FOREIGN KEY (`specsId`) REFERENCES `Specifications`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttributionPonctuelle` ADD CONSTRAINT `AttributionPonctuelle_courtId_fkey` FOREIGN KEY (`courtId`) REFERENCES `ReservationPonctuelle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttributionPonctuelle` ADD CONSTRAINT `AttributionPonctuelle_materielId_fkey` FOREIGN KEY (`materielId`) REFERENCES `Materiel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttributionPermanente` ADD CONSTRAINT `AttributionPermanente_materielId_fkey` FOREIGN KEY (`materielId`) REFERENCES `Materiel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
