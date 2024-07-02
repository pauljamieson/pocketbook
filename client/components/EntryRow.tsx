"use client";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { AccountEntry } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

interface Entry extends AccountEntry {
  balance: Decimal;
}

export default function EntryRow({ row, idx }: { row: Entry; idx: number }) {
  const { push } = useRouter();
  const params = useParams<{ id: string; entry: string }>();
  const rowStyle = "border-b py-0.5 hover:bg-blue-100";
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
    <tr
      key={idx}
      className={`text-sm ${rowStyle}`}
      onClick={() => push(`/account/${params.id}/${row.id}`)}
    >
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
      <td className="hidden xs:block">
        {Number(row.balance).toFixed(2) === "0.00"
          ? ""
          : Number(row.balance).toFixed(2)}
      </td>
    </tr>
  );
}
