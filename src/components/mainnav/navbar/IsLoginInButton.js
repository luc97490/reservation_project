"use client";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useTransition } from "react";

export default function IsLoginInButton() {
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <SignedIn>
        <UserButton
          afterSignOutUrl="/"
          afterMultiSessionSingleSignOutUrl="/"
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-slate-500 hover:bg-black text-sm normal-case",
              userButtonPopoverFooter: "hidden",
              avatarBox: "w-14 h-14 ",
              userButtonTrigger: "mx-12",
            },
          }}
        />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="btn">Se connecter</button>
        </SignInButton>
      </SignedOut>
    </>
  );
}