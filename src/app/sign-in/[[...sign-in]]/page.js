import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex mt-4 justify-center">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary:
              "bg-slate-500 hover:bg-black text-sm normal-case",
          },
        }}
      />{" "}
    </div>
  );
}
