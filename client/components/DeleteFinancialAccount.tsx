"use client";

import { deleteFinancialAccount } from "@/app/actions/actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";
import { useFormState } from "react-dom";

export default function DeleteFinancialAccount({ id }: { id: string }) {
  const [state, action] = useFormState(deleteFinancialAccount, { status: "" });

  if (state?.status === "success") {
    ;
    redirect("/accounts");
  }

  return (
    <form action={action}>
      <button className="btn" type="submit">
        DEL
      </button>
      <input type="hidden" name="id" value={id} />
    </form>
  );
}
