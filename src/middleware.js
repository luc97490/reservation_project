import { authMiddleware } from "@clerk/nextjs";
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
    // Get ROLE
    const searchUser = await fetch("http://localhost:3000/api/users/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idclerk: auth.userId,
      }),
    });

    const finduser = await searchUser.json();
    const role = finduser.userfind.role;
    const requiredRole = getRequiredRole(req.nextUrl.pathname); // une fonction qui renvoie le rôle requis pour la page demandée

    if (!requiredRole.includes(role)) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  },
});

function getRequiredRole(pathname) {
  if (
    pathname.startsWith("/permanente") ||
    pathname.startsWith("/ponctuelle") ||
    pathname.startsWith("/materiels")
  ) {
    return ["Admin", "SuperAdmin"];
  } else if (pathname.startsWith("/user")) {
    return ["Admin", "User", "SuperAdmin"];
  } else {
    return ["User"];
  }
}
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};
