import DeleteFinancialAccount from "@/components/DeleteFinancialAccount";
import EntryRow from "@/components/EntryRow";
import FileUploadForm from "@/components/FileUploadForm";
import prisma from "@/lib/prisma";
import { AccountEntry } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface Entry extends AccountEntry {
  balance: Decimal;
}

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;

  const accountInfo = await prisma.financialAccount.findFirst({
    where: { id },
  });
  let balance = accountInfo?.value;

  const entries = await prisma.accountEntry.findMany({
    where: { financialAccount: id },
    orderBy: { datePosted: "desc" },
  });

  function formatDate(date: bigint) {
    return (
      date.toString().slice(0, 4) +
      "/" +
      date.toString().slice(4, 6) +
      "/" +
      date.toString().slice(6, 8)
    );
  }

  prepEntries(entries, balance);

  function prepEntries(
    entries: AccountEntry[],
    initialBalance: Decimal = new Decimal(0)
  ): Entry[] {
    let nextTotal = initialBalance;

    const sorted = entries
      .sort((a, b) => (a.datePosted < b.datePosted ? 1 : 0))
      .map((val) => {
        return { ...val, balance: new Decimal(0) };
      });
    const days = [...new Set(sorted.map((i) => i.datePosted))];
    for (let day of days) {
      const idx = sorted.map((i) => i.datePosted).indexOf(day);
      sorted[idx].balance = nextTotal;
      nextTotal = nextTotal.sub(
        sorted
          .filter((i) => i.datePosted === BigInt(day))
          .map((i) => i.transactionAmount)
          .reduce((prev, curr) => prev.add(curr))
      );
    }
    return sorted;
  }

  const headerStyle = "bg-blue-200 border text-left px-4 py-2";
  const rowStyle = "border-b py-0.5 hover:bg-blue-100";
  return (
    <div className="flex flex-wrap flex-col gap-2">
      <div className="">
        <h1>Account Name: {accountInfo?.name}</h1>
        <p>{accountInfo?.type}</p>
      </div>
      <div className="flex gap-6">
        <p>Current Balance ${Number(accountInfo?.value).toFixed(2)}</p>
        <div>
          {Number(accountInfo?.limit) > 0 && (
            <p>Limit: ${Number(accountInfo?.limit).toFixed(2)}</p>
          )}
          {Number(accountInfo?.interestRate) > 0 && (
            <p>
              Interest Rate: {Number(accountInfo?.interestRate)?.toFixed(2)}%
            </p>
          )}
        </div>
        <FileUploadForm id={id} />
        <DeleteFinancialAccount id={id} />
      </div>

      <table className="shadow-lg border-collapse m-2">
        <thead>
          <tr>
            <th className={headerStyle}>Date</th>
            <th className={headerStyle}>Description</th>
            <th className={headerStyle}>Withdrawl</th>
            <th className={headerStyle}>Deposit</th>
            <th className={`${headerStyle} hidden xs:block`}>Balance</th>
          </tr>
        </thead>
        <tbody className="cursor-pointer">
          {prepEntries(entries, balance).map((row, idx) => (
            <EntryRow row={row} idx={idx} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
