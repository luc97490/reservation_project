"use client";
import Userfind from "@/components/Userfind";
import ReservationNoLogin from "@/components/form/ReservationNoLogin";
import ReservationUser from "@/components/form/ReservationUser";

export default function Home() {
  const id = localStorage.getItem("id");
  const email = localStorage.getItem("email");
  let finduser;
  if (id) {
    if (!email) {
      // finduser = (
      //   await fetch(` ${process.env.URLDEPLOYE}/api/users/create`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       id: user.id,
      //       image: user.profileImageUrl,
      //       email: user.emailAddresses[0].emailAddress,
      //     }),
      //   })
      // ).json();
    }
  }
  return (
    <div>{id ? <ReservationUser email={email} /> : <ReservationNoLogin />}</div>
  );
}
