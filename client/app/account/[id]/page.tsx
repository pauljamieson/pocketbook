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

  const sample = {
    id: "clxqu22nq00028nar0vb7rzii",
    name: "Savings",
    type: "SAVINGS",
    value: 20000,
    limit: 0,
    interestRate: 1.5,
    userId: "clxqu1oey00008naroy7xnndv",
  };

  return (
    <div className="flex flex-wrap">
      <div>
        <h1>Account Name: {accountInfo?.name}</h1>
        <p>{accountInfo?.type}</p>
      </div>
      <p>${Number(accountInfo?.value).toFixed(2)}</p>
      <div>
        <p>Limit: ${Number(accountInfo?.limit).toFixed(2)}</p>
        <p>Interest Rate: {Number(accountInfo?.interestRate)?.toFixed(2)}%</p>
      </div>
      <FileUploadForm id={id}/>
    </div>
  );
}
