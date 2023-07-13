import { SignIn, currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();

  return <div></div>;
  // return <div>Hello {user?.emailAddresses[0].emailAddress}</div>;
}
