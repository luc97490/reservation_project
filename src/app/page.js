import { currentUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";

import { NextResponse } from "next/server";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    const res = await fetch("/api/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
      }),
    });

    const data = await res.json();

    return NextResponse.json(data);
  } else console.log("non connecté");

  if (!user) return <div>Not logged in</div>;
  return <div>Hello {user?.emailAddresses[0].emailAddress}</div>;
}
