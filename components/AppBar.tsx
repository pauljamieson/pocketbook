import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";
import React from "react";

export default async function AppBar() {
  const session = await auth();

  return (
    <div className="p-2 bg-gradient-to-b from-slate-800 to-slate-600 flex gap-2">
      <Link href="/clientpage">Client Page</Link>
      <Link href="/serverpage">Server Page</Link>
      <Link href="/middlewarepage">Middleware Page</Link>
      <div className="ml-auto">
        {session && session.user ? (
          <div className="flex gap-2">
            <p>{session.user.name}</p>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button type="submit">Sign Out</button>
            </form>
          </div>
        ) : (
          <div>
            <form
              action={async () => {
                "use server";
                await signIn();
              }}
            >
              <button type="submit">Sign In</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
