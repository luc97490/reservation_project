import Userfind from "@/components/Userfind";
import ReservationUser from "@/components/form/ReservationUser";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();
  let finduser;
  if (user) {
    const searchUser = await fetch("http://localhost:3000/api/users/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idclerk: user.id,
      }),
    });
    finduser = await searchUser.json();

    if (!finduser.userfind) {
      finduser = (
        await fetch("http://localhost:3000/api/users/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user.id,
            image: user.profileImageUrl,
            email: user.emailAddresses[0].emailAddress,
          }),
        })
      ).json();
    }
  }
  return (
    <div>
      <Userfind finduser={await finduser} />
      <ReservationUser />
    </div>
  );
}
