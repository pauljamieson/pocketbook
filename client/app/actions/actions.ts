"use server";

import prisma from "@/lib/prisma";
import { AccountType } from "@prisma/client";
import { parseMsMoneyOFX } from "@/lib/MsMoneyTools";

export type CreateAccountState = {
  message: string;
  errors: any;
};

export async function createAccount(
  prevState: CreateAccountState,
  formData: FormData
): Promise<CreateAccountState> {
  const rawFormData = {
    name: formData.get("name") as string,
    accountType: formData.get("account-type") as AccountType,
    initialValue: formData.get("inital-value") as unknown as number,
    limit: formData.get("limit") as unknown as number,
    interestRate: formData.get("interest-rate") as unknown as number,
    id: formData.get("user-id") as string,
  };

  const result = await prisma.financialAccount.create({
    data: {
      name: rawFormData.name,
      type: rawFormData.accountType.toUpperCase() as AccountType,
      value: rawFormData.initialValue,
      limit: rawFormData.limit,
      interestRate: rawFormData.interestRate,
      userId: rawFormData.id,
    },
  });

  return { message: "", errors: undefined };
}

export async function uploadOfxFile(
  prevState: any,
  formData: FormData
): Promise<any> {
  console.log(formData.getAll("file"));
  const file = formData.get("file") as File;
  const id = formData.get("id") as string;
  console.log(id);
  const text = await file.text();
  const uploadData = parseMsMoneyOFX(text);
  let transactions = undefined;

  if ("ccstmtrs" in uploadData)
    transactions = uploadData.ccstmtrs.banktranlist.stmttrns;
  if ("stmtrs" in uploadData)
    transactions = uploadData.stmtrs.banktranlist.stmttrns;
  transactions?.forEach(async (val) => {
    const result = await prisma.accountEntry.create({
      data: {
        transactionType: val.trntype,
        transactionAmount: val.trnamt,
        datePosted: parseInt(val.dtposted),
        financialId: val.fitid,
        name: val.name,
        memo: val.memo,
        financialAccount: id,
      },
    });
    console.log(result);
  });

  return { status: "success" };
}
