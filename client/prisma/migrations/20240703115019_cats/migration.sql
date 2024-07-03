/*
  Warnings:

  - Added the required column `updatedAt` to the `AccountEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `FinancialAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccountEntry" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "FinancialAccount" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "EntryCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EntryCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AccountEntryToEntryCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AccountEntryToEntryCategory_AB_unique" ON "_AccountEntryToEntryCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountEntryToEntryCategory_B_index" ON "_AccountEntryToEntryCategory"("B");

-- AddForeignKey
ALTER TABLE "EntryCategory" ADD CONSTRAINT "EntryCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountEntryToEntryCategory" ADD CONSTRAINT "_AccountEntryToEntryCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "AccountEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountEntryToEntryCategory" ADD CONSTRAINT "_AccountEntryToEntryCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "EntryCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
