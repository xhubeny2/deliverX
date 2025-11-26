/*
  Warnings:

  - The values [DELAYED] on the enum `Run_Status` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `deliveryDate` on table `Delivery` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Run_Status_new" AS ENUM ('ACTIVE', 'FINISHED');
ALTER TABLE "public"."Run" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Run" ALTER COLUMN "status" TYPE "Run_Status_new" USING ("status"::text::"Run_Status_new");
ALTER TYPE "Run_Status" RENAME TO "Run_Status_old";
ALTER TYPE "Run_Status_new" RENAME TO "Run_Status";
DROP TYPE "public"."Run_Status_old";
ALTER TABLE "Run" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterTable
ALTER TABLE "Delivery" ALTER COLUMN "deliveryDate" SET NOT NULL;
