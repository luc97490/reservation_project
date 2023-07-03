-- CreateTable
CREATE TABLE `Materiel` (
    `id` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `disponibilite` BOOLEAN NOT NULL DEFAULT false,
    `specsId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Materiel_nom_key`(`nom`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Specification` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `modele` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReservationPonctuelle` (
    `id` VARCHAR(191) NOT NULL,
    `objet` VARCHAR(191) NOT NULL,
    `lieu` VARCHAR(191) NOT NULL,
    `debut` DATETIME(3) NOT NULL,
    `fin` DATETIME(3) NOT NULL,
    `commentaire` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AttributionPonctuelle` (
    `id` VARCHAR(191) NOT NULL,
    `reservationId` VARCHAR(191) NOT NULL,
    `materielId` VARCHAR(191) NOT NULL,
    `dateAsign` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateRendu` DATETIME(3) NULL,
    `rendu` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AttributionPermanente` (
    `id` VARCHAR(191) NOT NULL,
    `materielId` VARCHAR(191) NOT NULL,
    `dateAsign` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `preparateur` VARCHAR(191) NOT NULL,
    `rendu` BOOLEAN NOT NULL DEFAULT false,
    `dateRendu` DATETIME(3) NULL,
    `observation` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `role` ENUM('SuperAdmin', 'Admin', 'User', 'Guest') NOT NULL DEFAULT 'Guest',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Materiel` ADD CONSTRAINT `Materiel_specsId_fkey` FOREIGN KEY (`specsId`) REFERENCES `Specification`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationPonctuelle` ADD CONSTRAINT `ReservationPonctuelle_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttributionPonctuelle` ADD CONSTRAINT `AttributionPonctuelle_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `ReservationPonctuelle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttributionPonctuelle` ADD CONSTRAINT `AttributionPonctuelle_materielId_fkey` FOREIGN KEY (`materielId`) REFERENCES `Materiel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttributionPermanente` ADD CONSTRAINT `AttributionPermanente_materielId_fkey` FOREIGN KEY (`materielId`) REFERENCES `Materiel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttributionPermanente` ADD CONSTRAINT `AttributionPermanente_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
