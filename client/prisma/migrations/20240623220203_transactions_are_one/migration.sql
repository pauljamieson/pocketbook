-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEBIT', 'CREDIT');

-- CreateTable
CREATE TABLE "AccountEntry" (
    "id" SERIAL NOT NULL,
    "transaction_type" "TransactionType" NOT NULL,
    "date_posted" INTEGER NOT NULL,
    "financial_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "memo" TEXT,
    "financialAccount" TEXT NOT NULL,

    CONSTRAINT "AccountEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountEntry_financial_id_key" ON "AccountEntry"("financial_id");

-- AddForeignKey
ALTER TABLE "AccountEntry" ADD CONSTRAINT "AccountEntry_financialAccount_fkey" FOREIGN KEY ("financialAccount") REFERENCES "FinancialAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
