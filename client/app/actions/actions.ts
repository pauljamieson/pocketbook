"use server";

import prisma from "@/lib/prisma";
import { AccountType } from "@prisma/client";

export type CreateAccountState = {
  message: string;
  errors: any;
};

export async function createAccount(
  prevState: CreateAccountState,
  formData: FormData
): Promise<CreateAccountState> {
  //console.log(formData);
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

  //console.log(result);
  //console.log("here");

  return { message: "", errors: undefined };
}
