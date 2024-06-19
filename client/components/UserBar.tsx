import { auth } from "@/auth";
import React from "react";

export default async function UserBar() {
  const session = await auth();
  return (
    <div className="border-b">
      <p>Name: {session?.user?.name}</p>
    </div>
  );
}
