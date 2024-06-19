"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useCallback } from "react";

export default function CreateNewAccountButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  function handleClick() {
    router.push(pathname + "?" + createQueryString("new-account", "y"));
  }
  return (
    <button onClick={handleClick} className="btn w-[90%] self-center">
      Create New Account
    </button>
  );
}
