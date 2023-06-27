/*
  Warnings:

  - You are about to drop the column `nom` on the `attributionpermanente` table. All the data in the column will be lost.
  - You are about to drop the column `prenom` on the `attributionpermanente` table. All the data in the column will be lost.
  - You are about to drop the column `recuperateur` on the `attributionpermanente` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `reservationponctuelle` table. All the data in the column will be lost.
  - You are about to drop the column `nom` on the `reservationponctuelle` table. All the data in the column will be lost.
  - You are about to drop the column `prenom` on the `reservationponctuelle` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verificationrequest` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `attributionPermanenteId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `lastName` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `Session_userId_fkey`;

-- AlterTable
ALTER TABLE `attributionpermanente` DROP COLUMN `nom`,
    DROP COLUMN `prenom`,
    DROP COLUMN `recuperateur`,
    ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `reservationponctuelle` DROP COLUMN `email`,
    DROP COLUMN `nom`,
    DROP COLUMN `prenom`,
    ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `createdAt`,
    DROP COLUMN `emailVerified`,
    DROP COLUMN `name`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `attributionPermanenteId` INTEGER NOT NULL,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `lastName` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `account`;

-- DropTable
DROP TABLE `session`;

-- DropTable
DROP TABLE `verificationrequest`;

-- AddForeignKey
ALTER TABLE `ReservationPonctuelle` ADD CONSTRAINT `ReservationPonctuelle_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttributionPermanente` ADD CONSTRAINT `AttributionPermanente_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
