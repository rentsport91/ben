-- CreateTable
CREATE TABLE "Shipment" (
    "id" SERIAL NOT NULL,
    "senderName" TEXT NOT NULL,
    "senderCompany" TEXT NOT NULL,
    "senderEmail" TEXT NOT NULL,
    "senderPhone" TEXT NOT NULL,
    "originAddress" TEXT NOT NULL,
    "originCity" TEXT NOT NULL,
    "originState" TEXT NOT NULL,
    "originPostalCode" TEXT NOT NULL,
    "originCountry" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "recipientCompany" TEXT NOT NULL,
    "recipientEmail" TEXT NOT NULL,
    "recipientPhone" TEXT NOT NULL,
    "destinationAddress" TEXT NOT NULL,
    "destinationCity" TEXT NOT NULL,
    "destinationState" TEXT NOT NULL,
    "destinationPostalCode" TEXT NOT NULL,
    "destinationCountry" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
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
    "signature" BOOLEAN NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Shipment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
