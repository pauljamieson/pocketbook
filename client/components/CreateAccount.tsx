"use client";
import { createAccount } from "@/app/actions/actions";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";

export default function CreateAccount() {
  const [state, formAction] = useFormState(createAccount, {
    message: "",
    errors: undefined,
  });
  const formRef = useRef<HTMLFormElement>(null);
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const showDialog = searchParams.get("new-account");
  const dialogRef = useRef<null | HTMLDialogElement>(null);

  const deleteNewAccountQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("new-account");
    return params.toString();
  }, [searchParams]);

  useEffect(() => {
    if (showDialog === "y") dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [showDialog]);

  function onClose(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    formRef.current?.reset();
    router.push(pathname + "?" + deleteNewAccountQueryString());
  }

  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-white backdrop:opacity-65 rounded-2xl"
    >
      <div className="flex flex-col gap-2 max-w-96 bg-blue-600 p-4 rounded-2xl backdrop:bg-white backdrop:opacity-65">
        <h1 className="text-center">Create New Account\Loan</h1>
        <form action={formAction} className="flex flex-col gap-2" ref={formRef}>
          <label htmlFor="name">Account Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Basic Plus Bank Account"
          />
          <label htmlFor="account-type">Type</label>
          <select name="account-type" required defaultValue={"savings"}>
            <option value="savings">Savings</option>
            <option value="chequing">Chequing</option>
            <option value="creditcard">Credit Card</option>
            <option value="loan">Loan</option>
          </select>
          <label htmlFor="intial-value">Initial Value</label>
          <input
            type="number"
            name="inital-value"
            defaultValue={0.0}
            step="0.01"
            required
          />
          <label htmlFor="limit">Credit Limit\Loan Amount</label>
          <input type="number" defaultValue={0.0} name="limit" step="0.01" />
          <label htmlFor="interest-rate">Interest Rate</label>
          <input
            type="number"
            defaultValue={0.0}
            name="interest-rate"
            step="0.01"
          />
          {session.status !== "loading" && (
            <input type="hidden" name="user-id" value={session?.data?.userId} />
          )}
          <div className="flex gap-2 justify-center">
            <button className="btn w-20" onClick={onClose}>
              Close
            </button>
            <button type="submit" className="btn w-20">
              Save
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
