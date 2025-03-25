/*
  Warnings:

  - You are about to drop the column `dangerous` on the `Shipment` table. All the data in the column will be lost.
  - You are about to drop the column `declaredValue` on the `Shipment` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Shipment` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `Shipment` table. All the data in the column will be lost.
  - You are about to drop the column `insurance` on the `Shipment` table. All the data in the column will be lost.
  - You are about to drop the column `length` on the `Shipment` table. All the data in the column will be lost.
  - You are about to drop the column `packageType` on the `Shipment` table. All the data in the column will be lost.
  - You are about to drop the column `pieces` on the `Shipment` table. All the data in the column will be lost.
  - You are about to drop the column `signature` on the `Shipment` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Shipment` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `Shipment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Shipment" DROP COLUMN "dangerous",
DROP COLUMN "declaredValue",
DROP COLUMN "description",
DROP COLUMN "height",
DROP COLUMN "insurance",
DROP COLUMN "length",
DROP COLUMN "packageType",
DROP COLUMN "pieces",
DROP COLUMN "signature",
DROP COLUMN "weight",
DROP COLUMN "width";

-- CreateTable
CREATE TABLE "Package" (
    "id" SERIAL NOT NULL,
    "packageType" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "length" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "declaredValue" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "pieces" INTEGER NOT NULL,
    "dangerous" BOOLEAN NOT NULL,
    "insurance" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "shipmentId" INTEGER NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "Shipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
