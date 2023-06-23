-- CreateTable
CREATE TABLE `Materiel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `disponibilite` BOOLEAN NOT NULL,
    `caractId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CaractMateriel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `modele` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReservationCourtTerme` (
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
CREATE TABLE `AttributionMaterielCourt` (
    `courtId` INTEGER NOT NULL,
    `materielId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`courtId`, `materielId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReservationLongTerme` (
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
ALTER TABLE `Materiel` ADD CONSTRAINT `Materiel_caractId_fkey` FOREIGN KEY (`caractId`) REFERENCES `CaractMateriel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttributionMaterielCourt` ADD CONSTRAINT `AttributionMaterielCourt_courtId_fkey` FOREIGN KEY (`courtId`) REFERENCES `ReservationCourtTerme`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AttributionMaterielCourt` ADD CONSTRAINT `AttributionMaterielCourt_materielId_fkey` FOREIGN KEY (`materielId`) REFERENCES `Materiel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationLongTerme` ADD CONSTRAINT `ReservationLongTerme_materielId_fkey` FOREIGN KEY (`materielId`) REFERENCES `Materiel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
