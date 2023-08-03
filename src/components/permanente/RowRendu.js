export default function RowRendu({ attribution }) {
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

  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th
          scope="row"
          className="flex items-center px-2 py-2 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <img
            className="w-10 h-10 rounded-full"
            src={attribution.user.image || "/user_no_image.png"}
            alt={attribution.user.email}
          />
          <div className="pl-3">
            <div className="text-base font-semibold">
              <span className=" uppercase">
                {attribution.user.email.split("@")[0].split(".")[0]}
              </span>
              <span className="capitalize">
                {" "}
                {attribution.user.email.split("@")[0].split(".")[1]}{" "}
              </span>
            </div>
            <div className="font-normal text-gray-500">
              {attribution.user.email}
            </div>
          </div>
        </th>
        <td className="px-2 py-2">
          <div>{formatDateString(attribution.dateAsign)}</div>
          <div className="font-bold line-clamp-1">
            {formatDateString(attribution.dateRendu)}
          </div>
        </td>

        <td className="px-2 py-2">
          <div> {attribution.preparateur}</div>
          <div> {attribution.observation}</div>
        </td>

        <td className="px-2 py-2 font-bold">{attribution.materiel.nom}</td>
      </tr>
    </>
  );
}
