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
              <FormRow key={row.id} data={row} />
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
            {shouldShowAddForm(row.id) && <FormRow key={row.id+'new'} parentId={row.id} />}
          </>
        ))}
      </>
    );
  };
  return (
    <div className="table">
      <header className="table__header">Строительно-монтажные работы</header>
      <div className="table__content">
        <table onMouseLeave={() => hideIcons && hideIcons(true)}>
          <tr className="table__head">
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
          {data.length > 0 ? renderRows(data, 1) : <FormRow />}
          {shouldShowAddForm(null) && <FormRow />}
        </table>
      </div>
    </div>
  );
}
