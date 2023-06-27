-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('SuperAdmin', 'Admin', 'User') NOT NULL DEFAULT 'User';
