import { auth } from "@/auth";
import AccountList from "@/components/AccountList";
import CreateAccount from "@/components/CreateAccount";
import CreateNewAccountButton from "@/components/CreateNewAccountButton";
import UserBar from "@/components/UserBar";
import prisma from "@/lib/prisma";

export default async function page() {
  const session = await auth();
  const accounts = await prisma.financialAccount.findMany({
    where: {
      userId: session?.user?.id,
    },
  });
  return (
    <div className="flex flex-col gap-2 overflow-auto">
      <UserBar />
      <CreateNewAccountButton />
      <CreateAccount />
      <AccountList accounts={accounts} />
    </div>
  );
}
