-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'CREATED', 'APPROVED', 'SCHEDULED', 'REJECTED');

-- CreateTable
CREATE TABLE "Transfer" (
    "externalId" SERIAL NOT NULL,
    "internalId" VARCHAR(255),
    "status" "Status" NOT NULL DEFAULT E'PENDING',
    "amount" INTEGER NOT NULL,
    "expectedOn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("externalId")
);
