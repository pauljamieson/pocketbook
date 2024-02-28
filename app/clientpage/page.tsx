"use client";
import { useSession } from "next-auth/react";
import React from "react";

export default function Page() {
  const { data: session } = useSession();
  if (!session || !session.user)
    return <div className="text-red-600">You must login to use this page!</div>;
  return <div>This is a protected client page.</div>;
}
