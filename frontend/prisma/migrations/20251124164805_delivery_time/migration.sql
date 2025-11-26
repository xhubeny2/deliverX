/*
  Warnings:

  - You are about to drop the column `deliveryTime` on the `Delivery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "deliveryTime",
ADD COLUMN     "deliveryDate" TIMESTAMP(3),
ADD COLUMN     "order" INTEGER;
