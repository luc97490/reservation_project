import { currentUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
export default async function Home() {
  const user = await currentUser();
  console.log(user);
  if (!user) return <div>Not logged in</div>;
  return <div>Hello {user?.emailAddresses[0].emailAddress}</div>;
}
