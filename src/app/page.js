import ReservationUser from "@/components/form/ReservationUser";
import { SignIn, currentUser } from "@clerk/nextjs";

export default async function Home() {
  return (
    <div>
      {" "}
      <ReservationUser />
    </div>
  );
  // return <div>Hello {user?.emailAddresses[0].emailAddress}</div>;
}
