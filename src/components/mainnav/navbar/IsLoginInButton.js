import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function IsLoginInButton() {
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
        <SignInButton>
          <button className="btn normal-case">Se connecter</button>
        </SignInButton>
      </SignedOut>
    </>
  );
}
