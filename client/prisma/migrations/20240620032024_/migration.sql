/*
  Warnings:

  - The primary key for the `FinancialAccount` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "FinancialAccount" DROP CONSTRAINT "FinancialAccount_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "FinancialAccount_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "FinancialAccount_id_seq";
