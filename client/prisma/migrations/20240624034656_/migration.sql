/*
  Warnings:

  - You are about to drop the column `date_posted` on the `AccountEntry` table. All the data in the column will be lost.
  - You are about to drop the column `financial_id` on the `AccountEntry` table. All the data in the column will be lost.
  - You are about to drop the column `transaction_type` on the `AccountEntry` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[financialId]` on the table `AccountEntry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `datePosted` to the `AccountEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `financialId` to the `AccountEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionAmount` to the `AccountEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionType` to the `AccountEntry` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AccountEntry_financial_id_key";

-- AlterTable
ALTER TABLE "AccountEntry" DROP COLUMN "date_posted",
DROP COLUMN "financial_id",
DROP COLUMN "transaction_type",
ADD COLUMN     "datePosted" BIGINT NOT NULL,
ADD COLUMN     "financialId" TEXT NOT NULL,
ADD COLUMN     "transactionAmount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "transactionType" "TransactionType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AccountEntry_financialId_key" ON "AccountEntry"("financialId");
