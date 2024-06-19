import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  //console.log(session);
  if (session) redirect("/accounts");

  return <main></main>;
}
