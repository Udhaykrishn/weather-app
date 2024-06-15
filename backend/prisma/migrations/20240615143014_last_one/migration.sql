/*
  Warnings:

  - You are about to drop the column `tetemperature` on the `History` table. All the data in the column will be lost.
  - Added the required column `temperature` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" DROP COLUMN "tetemperature",
ADD COLUMN     "temperature" DOUBLE PRECISION NOT NULL;
