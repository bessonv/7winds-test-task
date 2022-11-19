import { useContext } from "react";
import './Row.style.sass';
import { AppContext } from "../../context/app.context";
import RowProps from "./Row.types";
import Icon from "../Icon/Icon";

export default function Row({
  data,
  nestLevel,
  showAddForm,
  showEditForm
}: RowProps): JSX.Element {
  const { id, rowName, salary, materials, mainCosts, estimatedProfit } = data;
  const { deleteRow, isHidden, hideIcons: hideIcons } = useContext(AppContext);

  return (
    <tr
      className="table-row"
      onDoubleClick={() => id && showEditForm && showEditForm(id)}
    >
      <td
        onMouseEnter={() => hideIcons && hideIcons(false)}
        className="table-row__level"
      >
        {nestLevel < 3 && (
          <>
            {nestLevel === 1 && 
              <Icon
                handler={() => showAddForm && showAddForm(null)}
                type={'first-folder'}
                className="table-row__first-folder" />}
            <Icon
              handler={() => showAddForm && showAddForm(id)}
              type={'second-folder'}
              hidden={nestLevel === 2 ? false : isHidden}
              className="table-row__second-folder" />
          </>
        )}
        <Icon
          handler={() => {}}
          type={'file'}
          hidden={nestLevel === 3 ? false : isHidden}
          className="table-row__file-icon " />
        <Icon
          handler={() => deleteRow && id && deleteRow(id)}
          type={'delete'}
          hidden={isHidden}
          className="table-row__delete-icon" />
      </td>
      <td className="talbe-row__name">{rowName}</td>
      <td className="talbe-row__salary">{salary}</td>
      <td className="talbe-row__materials">{materials}</td>
      <td className="talbe-row__coasts">{mainCosts}</td>
      <td className="talbe-row__profit">{estimatedProfit}</td>
    </tr>
  );
}
