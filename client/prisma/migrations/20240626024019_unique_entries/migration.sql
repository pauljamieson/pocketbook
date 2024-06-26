/*
  Warnings:

  - A unique constraint covering the columns `[financialId,financialAccount]` on the table `AccountEntry` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "AccountEntry_financialId_key";

-- CreateIndex
CREATE UNIQUE INDEX "AccountEntry_financialId_financialAccount_key" ON "AccountEntry"("financialId", "financialAccount");
