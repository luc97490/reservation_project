/*
  Warnings:

  - A unique constraint covering the columns `[idclerk]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `idclerk` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_idclerk_key` ON `User`(`idclerk`);
