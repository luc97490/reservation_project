import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex mt-4 justify-center">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-slate-500 hover:bg-black text-sm normal-case",
            card: "dark:bg-secondary-dark  ",
            formFieldInput: "dark:bg-primary-dark dark:text-white",
            headerSubtitle: "dark:text-white",
            headerTitle: "dark:text-white",
            formFieldLabel: "dark:text-white",
            footerActionText: "dark:text-white",
            formFieldSuccessText: "dark:text-white",
          },
        }}
      />
    </div>
  );
}
