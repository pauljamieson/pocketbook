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
  return (
    <div>
      {id} - {entry} - {data?.financialId}
    </div>
  );
}
