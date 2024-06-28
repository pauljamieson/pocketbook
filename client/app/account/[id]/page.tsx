import { uploadOfxFile } from "@/app/actions/actions";
import FileUploadForm from "@/components/FileUploadForm";
import prisma from "@/lib/prisma";
import React from "react";
import { useFormState } from "react-dom";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;

  const accountInfo = await prisma.financialAccount.findFirst({
    where: { id },
  });
  const entries = await prisma.accountEntry.findMany({
    where: { financialAccount: id },
  });

  const sample = {
    id: "clxqu22nq00028nar0vb7rzii",
    name: "Savings",
    type: "SAVINGS",
    value: 20000,
    limit: 0,
    interestRate: 1.5,
    userId: "clxqu1oey00008naroy7xnndv",
  };

  function formatDate(date: bigint) {
    return (
      date.toString().slice(0, 4) +
      "/" +
      date.toString().slice(4, 6) +
      "/" +
      date.toString().slice(6, 8)
    );
  }

  return (
    <div className="flex flex-wrap flex-col">
      <div>
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
      </div>

      <FileUploadForm id={id} />
      <table className="border-separate border-spacing-1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Withdrawl</th>
            <th>Deposit</th>
            <th className="hidden xs:block">Balance</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((row) => (
            <tr className="text-sm">
              <td>{formatDate(row.datePosted)}</td>
              <td className="line-clamp-1">{row.name}</td>
              <td>
                {row.transactionType === "DEBIT" &&
                  Math.abs(Number(row.transactionAmount)).toFixed(2)}
              </td>
              <td>
                {row.transactionType === "CREDIT" &&
                  Math.abs(Number(row.transactionAmount)).toFixed(2)}
              </td>
              <td className="hidden xs:block">BAL</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
