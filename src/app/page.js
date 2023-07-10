import { SignIn, currentUser } from "@clerk/nextjs";
import prisma from "@/lib/db";
import axios from "axios";
import Page from "./sign-in/[[...sign-in]]/page";

export default async function Home() {
  const user = await currentUser();

  return (
    <div>
      <Page />
    </div>
  );
  // return <div>Hello {user?.emailAddresses[0].emailAddress}</div>;
}
