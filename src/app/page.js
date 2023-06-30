import { currentUser } from "@clerk/nextjs";

export default async function POST() {
  const user = await currentUser();

  if (!user) return <div>Not logged in</div>;
  return <div>Hello {user?.emailAddresses[0].emailAddress}</div>;
}
