import {
  IconAp,
  IconCasque,
  IconHp,
  IconMulti,
  IconPortable,
  IconRallonge,
  IconVisio,
  IconVp,
  IconVr,
} from "@/components/ui/Icons";

import RowDetailsAttribution from "./RowDetailsAttribution";

const renderItems = (inputString) => {
  const items = inputString.split(", ");
  return items.map((item, index) => {
    const [quantity, label] = item.split(" ");

    return (
      <div key={index} className="flex gap-1">
        <span>{`${quantity}x`}</span>
        <div className="w-5 h-5">
          {label === "pc" && <IconPortable />}
          {label === "vp" && <IconVp />}
          {label === "hp" && <IconHp />}
          {label === "vr" && <IconVr />}
          {label === "visio" && <IconVisio />}
          {label === "ap" && <IconAp />}
          {label === "casque" && <IconCasque />}
          {label === "multi" && <IconMulti />}
          {label === "rallonge" && <IconRallonge />}
        </div>
      </div>
    );
  });
};

export default function RowAttributionRendu({
  reservation,
  rendu,
  setRefresh,
}) {
  function formatDateString(dateString) {
    const dateObj = new Date(dateString);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDate = dateObj.toLocaleDateString("fr-FR", options);
    return formattedDate;
  }
  let bgcolor = "bg-white";
  if (!rendu) {
    formatDateString(reservation.fin) < formatDateString(new Date())
      ? (bgcolor = "bg-red-400 dark:bg-black")
      : (bgcolor = "bg-white dark:bg-gray-800");
  }

  return (
    <>
      <tr
        key={reservation.id}
        className={` ${bgcolor} file:border-b  dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
      >
        <th
          scope="row"
          className="flex items-center px-2 py-2 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <img
            className="w-10 h-10 rounded-full"
            src={reservation.user.image || "/user_no_image.png"}
            alt={reservation.user.email}
          />
          <div className="pl-3">
            <div className="text-base font-semibold">
              <span className=" uppercase">
                {reservation.user.email.split("@")[0].split(".")[0]}
              </span>
              <span className="capitalize">
                {" "}
                {reservation.user.email.split("@")[0].split(".")[1]}{" "}
              </span>
            </div>
            <div className="font-normal text-gray-500">
              {reservation.user.email}
            </div>
          </div>
        </th>
        <td className="px-2 py-2">
          <div className="font-bold line-clamp-1">
            {formatDateString(reservation.attribution[0].dateAsign)}
          </div>
          <div>{formatDateString(reservation.fin)}</div>
        </td>

        <td className="px-2 py-2">
          <div>{reservation.objet}</div>
          <div>{reservation.lieu}</div>
        </td>
        <td className="px-2 py-2">{reservation.commentaire}</td>
        <td className=" grid grid-cols-3 px-2 py-2 gap-y-2 h-auto ">
          {renderItems(reservation.materiels)}
        </td>
        <td></td>
      </tr>
      <RowDetailsAttribution
        rendu={rendu}
        attributions={reservation.attribution}
        setRefresh={setRefresh}
      />
    </>
  );
}
