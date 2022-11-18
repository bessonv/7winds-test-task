import { useContext } from "react";
import { AppContext } from "../../context/app.context";
import RowProps from "./Row.types";

export default function Row({
  data,
  nestLevel,
  showAddForm,
  showEditForm
}: RowProps): JSX.Element {
  const { rowName, salary, materials, mainCosts, estimatedProfit } = data;
  const { deleteRow } = useContext(AppContext);

  return (
    <tr
      className="table-row"
      onDoubleClick={() => showEditForm && data.id && showEditForm(data.id)}
    >
      <td className="table-row__level">
        {nestLevel < 3 && (
          <button onClick={() => showAddForm && showAddForm(data.id)}>a</button>
        )}
        <button
          onClick={() => showEditForm && data.id && showEditForm(data.id)}
        >
          e
        </button>
        <button onClick={() => deleteRow && data.id && deleteRow(data.id)}>
          d
        </button>
      </td>
      <td className="talbe-row__name">{rowName}</td>
      <td className="talbe-row__salary">{salary}</td>
      <td className="talbe-row__materials">{materials}</td>
      <td className="talbe-row__coasts">{mainCosts}</td>
      <td className="talbe-row__profit">{estimatedProfit}</td>
    </tr>
  );
}
