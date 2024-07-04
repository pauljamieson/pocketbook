import GoBackButton from "@/components/GoBackButton";
import prisma from "@/lib/prisma";
import React from "react";

export default async function page({
  params: { id, entry },
}: {
  params: {
    id: string;
    entry: string;
  };
}) {
  const data = await prisma.accountEntry.findFirst({
    where: {
      id: parseInt(entry),
      financialAccount: id,
    },
  });

  function formatDate(date: bigint | undefined) {
    if (!date) return "";
    return (
      date.toString().slice(0, 4) +
      "/" +
      date.toString().slice(4, 6) +
      "/" +
      date.toString().slice(6, 8)
    );
  }
  return (
    <div className="flex flex-col border-2 p-2 w-96 mx-auto my-5 shadow-lg rounded-lg">
      <h2>{formatDate(data?.datePosted)}</h2>
      <h1>{data?.name}</h1>
      <h2>{data?.memo}</h2>
      <h2
        className={`font-bold 
          ${
            data?.transactionType === "DEBIT"
              ? "text-red-600"
              : "text-green-600"
          }`}
      >
        {data?.transactionType === "DEBIT" ? "Withdrawl" : "Deposit"}
      </h2>
      <h1 className="text-right">{data?.transactionAmount.toFixed(2)}</h1>

      <GoBackButton label="Back" />
    </div>
  );
}
