import ReservationUser from "@/components/form/ReservationUser";
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
            },
          }}
        />
      </div>
      <div className="flex mt-6 items-center">
        <div className="h-1 bg-gray-400 flex-grow"></div>
        <span className="mx-2 text-gray-500">OU</span>
        <div className="h-1 bg-gray-400 flex-grow"></div>
      </div>
      <ReservationUser />
    </div>
  );
}
