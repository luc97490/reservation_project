import { SignIn, currentUser } from "@clerk/nextjs";
import prisma from "@/lib/db";
import axios from "axios";

export default async function Home() {
  const user = await currentUser();
  if (!user)
    return (
      <div>
        <SignIn path="/sign-in" />
      </div>
    );
  return <div>Hello {user?.emailAddresses[0].emailAddress}</div>;
}
