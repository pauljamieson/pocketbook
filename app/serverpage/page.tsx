import { auth } from "@/auth";
import React from "react";

export default async function page() {
  const session = await auth();
  if (!session || !session.user)
    return <div className="text-red-600">You must login to use this page!</div>;
  return <div>This is a protected server page.</div>;
}
