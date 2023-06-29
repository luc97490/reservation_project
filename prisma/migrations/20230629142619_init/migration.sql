-- AlterTable
ALTER TABLE `attributionpermanente` MODIFY `dateAttribution` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `attributionponctuelle` MODIFY `rendu` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `materiel` MODIFY `disponibilite` BOOLEAN NOT NULL DEFAULT false;
