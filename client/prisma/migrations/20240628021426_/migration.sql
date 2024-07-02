-- DropForeignKey
ALTER TABLE "AccountEntry" DROP CONSTRAINT "AccountEntry_financialAccount_fkey";

-- DropForeignKey
ALTER TABLE "FinancialAccount" DROP CONSTRAINT "FinancialAccount_userId_fkey";

-- AddForeignKey
ALTER TABLE "FinancialAccount" ADD CONSTRAINT "FinancialAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountEntry" ADD CONSTRAINT "AccountEntry_financialAccount_fkey" FOREIGN KEY ("financialAccount") REFERENCES "FinancialAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
