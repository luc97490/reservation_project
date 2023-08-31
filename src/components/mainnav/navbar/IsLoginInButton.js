import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function IsLoginInButton() {
  return (
    <>
      <SignedIn>
        <UserButton
          afterSignOutUrl="/"
          afterMultiSessionSingleSignOutUrl="/"
          userProfileMode="navigation"
          userProfileUrl="/user-profile"
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-slate-500 hover:bg-black text-sm normal-case",
              userButtonPopoverFooter: "hidden",
              avatarBox: "w-14 h-14 ",
              userButtonTrigger: "mx-12",
              userButtonPopoverCard: "dark:bg-secondary-dark dark:text-white",
              userPreviewSecondaryIdentifier: "dark:text-white",
              userButtonPopoverActionButtonIcon: "dark:text-white",
              userButtonPopoverActionButtonText: "dark:text-white",
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
