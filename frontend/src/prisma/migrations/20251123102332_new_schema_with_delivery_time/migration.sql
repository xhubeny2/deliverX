/*
  Warnings:

  - The `status` column on the `Delivery` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `active` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Run` table. All the data in the column will be lost.
  - The `status` column on the `Run` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `deliveryTime` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `car` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Delivery_Status" AS ENUM ('PENDING', 'IN_TRANSIT', 'DELIVERED', 'FAILED');

-- CreateEnum
CREATE TYPE "Run_Status" AS ENUM ('ACTIVE', 'DELAYED', 'FINISHED');

-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "deliveryTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "Delivery_Status" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "active",
DROP COLUMN "phone",
ADD COLUMN     "car" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Run" DROP COLUMN "name",
DROP COLUMN "status",
ADD COLUMN     "status" "Run_Status" NOT NULL DEFAULT 'ACTIVE';

-- DropEnum
DROP TYPE "Status";
