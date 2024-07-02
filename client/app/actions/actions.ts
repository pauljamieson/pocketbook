"use server";

import prisma from "@/lib/prisma";
import { AccountType } from "@prisma/client";
import { parseMsMoneyOFX } from "@/lib/MsMoneyTools";
import { revalidatePath } from "next/cache";

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
  revalidatePath("/accounts");
  return { message: "", errors: undefined };
}

export async function uploadOfxFile(
  prevState: any,
  formData: FormData
): Promise<any> {
  const id = formData.get("id") as string;

  try {
    const file = formData.get("file") as File;

    if (file.name === "undefined") throw "No file selected.";

    const uploadData = parseMsMoneyOFX(await file.text());

    let initial = 0;
    let transactions = undefined;

    if ("stmtrs" in uploadData) {
      transactions = uploadData.stmtrs.banktranlist.stmttrns;
      initial = uploadData.stmtrs.ledgerbal.balamt;
    }

    if ("ccstmtrs" in uploadData) {
      transactions = uploadData.ccstmtrs.banktranlist.stmttrns;
      initial = uploadData.ccstmtrs.ledgerbal.balamt;
    }
    if (!transactions) return { status: "success", message: "No transactions" };

    const createData = transactions?.map((val: any) => ({
      transactionType: val.trntype,
      transactionAmount: val.trnamt,
      datePosted: parseInt(val.dtposted),
      financialId: val.fitid,
      name: val.name,
      memo: val.memo,
      financialAccount: id,
    }));

    const maxDate = Math.max(...createData.map((val) => val.datePosted));
    const {
      _max: { datePosted },
    } = await prisma.accountEntry.aggregate({
      where: { financialAccount: id },
      _max: { datePosted: true },
    });

    if (Number(datePosted) < maxDate) {
      await prisma.financialAccount.update({
        where: { id },
        data: { value: initial },
      });
    }

    await prisma.accountEntry.createMany({
      data: createData,
      skipDuplicates: true,
    });
    revalidatePath(`/account/${id}`);
    return { status: "success" };
  } catch (error) {
    console.error(error);
    revalidatePath(`/account/${id}`);
    return { status: "failure" };
  }
}

export async function deleteFinancialAccount(
  prevState: any,
  formData: FormData
): Promise<any> {
  const id = formData.get("id") as string;
  console.log(id);
  try {
    const result = await prisma.financialAccount.delete({ where: { id } });
    revalidatePath("/accounts");
    return { status: "success" };
  } catch (error) {
    console.error(error);
    return { status: "failure" };
  }
}
