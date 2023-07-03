import { authMiddleware } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs";

import { NextResponse } from "next/server";
export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up", "/api(.*)"],
  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      //  For public routes, we don't need to do anything
      return NextResponse.next();
    }

    const url = new URL(req.nextUrl.origin);

    if (!auth.userId) {
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
    const user = await clerkClient.users.getUser(auth.userId);

    if (!user) {
      throw new Error("User not found.");
    } else {
      const response = await fetch(
        "http://localhost:3000/api/users/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user.id,
            email: user.emailAddresses[0].emailAddress,
          }),
        }
      );
      if (response.ok) {
      } else {
        console.log("Une erreur s'est produite lors de la requête");
      }
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};
