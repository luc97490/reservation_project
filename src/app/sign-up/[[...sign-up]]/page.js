import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex mt-4 justify-center">
      <SignUp />
    </div>
  );
}
