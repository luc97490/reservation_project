import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/db";
export default async function POST() {
  const user = await currentUser();

  if (!user) return <div></div>;
  return <div>Hello {user?.emailAddresses[0].emailAddress}</div>;
}
