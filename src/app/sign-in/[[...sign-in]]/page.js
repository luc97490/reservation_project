import ReservationNoLogin from "@/components/form/ReservationNoLogin";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <div className="flex mt-4 justify-center">
        <SignIn
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
              identityPreviewText: "dark:text-white",
            },
          }}
        />
      </div>
      <div className="flex mt-6 items-center">
        <div className="h-1 bg-gray-400 flex-grow"></div>
        <span className="mx-2 text-gray-500">OU</span>
        <div className="h-1 bg-gray-400 flex-grow"></div>
      </div>
      <ReservationNoLogin />
    </div>
  );
}
