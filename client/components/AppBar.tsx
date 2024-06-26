import { auth, signIn, signOut } from "@/auth";
import React from "react";

export default async function AppBar() {
  const session = await auth();
  async function signInAction() {
    "use server";
    await signIn("google", { redirectTo: "/" });
  }

  async function signOutAction() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <div className="h-16 w-full bg-blue-700 flex items-center p-2">
      <h1 className="uppercase font-bold">PocketBook</h1>
      <div className="grow" />
      <nav>
        <ol>
          {!session ? (
            <li>
              <form action={signInAction}>
                <button type="submit">Sign In</button>
              </form>
            </li>
          ) : (
            <li>
              <form action={signOutAction}>
                <button type="submit">Sign Out</button>
              </form>
            </li>
          )}
        </ol>
      </nav>
    </div>
  );
}
