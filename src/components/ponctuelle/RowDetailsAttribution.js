import ModalRendu from "./ModalRendu";

export default function RowDetailsAttribution({
  rendu,
  attributions,
  setRefresh,
}) {
  return (
    <>
      {attributions &&
        attributions.map((attribution) => {
          if ((rendu && attribution.rendu) || (!rendu && !attribution.rendu)) {
            return (
              <tr
                key={attribution.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td></td>
                <td></td>
                <td className="font-bold">{attribution.materiel.nom}</td>
                <td>{attribution.materiel.etat}</td>
                <td></td>
                <td>
                  {rendu ? (
                    <>{attribution.remarque}</>
                  ) : (
                    <ModalRendu
                      attribution={attribution}
                      setRefresh={setRefresh}
                    />
                  )}
                </td>
              </tr>
            );
          } else {
            return null;
          }
        })}
    </>
  );
}
