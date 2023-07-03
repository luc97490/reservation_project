/*
  Warnings:

  - You are about to drop the `specifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `materiel` DROP FOREIGN KEY `Materiel_specsId_fkey`;

-- DropTable
DROP TABLE `specifications`;

-- CreateTable
CREATE TABLE `Specification` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `modele` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Materiel` ADD CONSTRAINT `Materiel_specsId_fkey` FOREIGN KEY (`specsId`) REFERENCES `Specification`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
