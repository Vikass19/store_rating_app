/*
  Warnings:

  - You are about to drop the column `rating` on the `rating` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,storeId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `value` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rating` DROP COLUMN `rating`,
    ADD COLUMN `value` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Rating_userId_storeId_key` ON `Rating`(`userId`, `storeId`);
