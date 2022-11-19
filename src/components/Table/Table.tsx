import TableProps from "./Table.types";
import './Table.style.sass';
import { TableData } from "../../interfaces/data.interface";
import Row from "../Row/Row";
import FormRow from "../FormRow/FormRow";
import { AppContext } from "../../context/app.context";
import { useContext, useState } from "react";

const headers = [
  "Уровень",
  "Наименование работ",
  "Основная з/п",
  "Оборудование",
  "Накладные расходы",
  "Сметная прибыль"
];

export default function Table({ tdata }: TableProps): JSX.Element {
  const { data, isFormOppend, toggleForm, hideIcons } = useContext(AppContext);
  const [currentId, setCurrentId] = useState<[number | null, string]>([
    null,
    ""
  ]);

  const showAddForm = (parentId: number | null) => {
    setCurrentId([parentId, "add"]);
    return toggleForm && toggleForm(true);
  };
  const showEditForm = (rowId: number) => {
    setCurrentId([rowId, "edit"]);
    return toggleForm && toggleForm(true);
  };
  const shouldShowEditForm = (id: number | null) => {
    if (!id) return false;
    return isFormOppend && currentId[0] === id && currentId[1] === "edit";
  };
  const shouldShowAddForm = (id: number | null) => {
    return isFormOppend && currentId[0] === id && currentId[1] === "add";
  };
  const renderRows = (rows: TableData[], nestLevel: number): JSX.Element => {
    if (nestLevel > 3) {
      return <></>;
    }
    return (
      <>
        {rows.map((row) => (
          <>
            {shouldShowEditForm(row.id) ? (
              <FormRow data={row} />
            ) : (
              <Row
                nestLevel={nestLevel}
                showAddForm={showAddForm}
                showEditForm={showEditForm}
                key={row.id}
                data={row}
              />
            )}
            {row.child && renderRows(row.child, nestLevel + 1)}
            {shouldShowAddForm(row.id) && <FormRow parentId={row.id} />}
          </>
        ))}
      </>
    );
  };
  return (
    <table className="table" onMouseLeave={() => hideIcons && hideIcons(true)}>
      <tr className="table__header">
        {headers.map((header) => (
          <th>{header}</th>
        ))}
      </tr>
      {data.length > 0 ? renderRows(data, 1) : <FormRow />}
      {shouldShowAddForm(null) && <FormRow />}
    </table>
  );
}
