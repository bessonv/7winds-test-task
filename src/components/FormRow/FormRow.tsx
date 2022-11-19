import FormRowProps from "./FormRow.types";
import './FormRow.style.sass';
import { TableData } from "../../interfaces/data.interface";
import { useContext, useState, ChangeEvent, useEffect } from "react";
import { AppContext } from "../../context/app.context";

const defaultData: TableData = {
  id: null,
  rowName: "",
  total: 0,
  salary: 0,
  mimExploitation: 0,
  machineOperatorSalary: 0,
  materials: 0,
  mainCosts: 0,
  supportCosts: 0,
  equipmentCosts: 0,
  overheads: 0,
  estimatedProfit: 0,
  parentId: null,
  child: []
};

export default function FormRow({
  data,
  parentId = null
}: FormRowProps): JSX.Element {
  const [formData, setFormData] = useState<TableData>(data ?? defaultData);
  const { addRow, editRow, toggleForm } = useContext(AppContext);
  useEffect(() => {
    const handleEscPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        return toggleForm && toggleForm(false);
      }
    };
    document.addEventListener("keydown", handleEscPress, false);
    return () => {
      document.removeEventListener("keydown", handleEscPress, false);
    };
  }, []);
  const handleChange = (
    key: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [key]: e.target.value });
  };
  const save = () => {
    if (formData.id) {
      return editRow && editRow(formData, formData.id);
    } else {
      return addRow && addRow(formData, parentId);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (e.key === "Enter") {
      save();
    }
  };
  return (
    <tr className="table-form" onKeyPress={handleKeyPress}>
      <td className="table-form__level"></td>
      <td>
        <input
          onChange={(e) => handleChange("rowName", e)}
          value={formData.rowName}
        />
      </td>
      <td>
        <input
          onChange={(e) => handleChange("salary", e)}
          value={formData.salary}
        />
      </td>
      <td>
        <input
          onChange={(e) => handleChange("materials", e)}
          value={formData.materials}
        />
      </td>
      <td>
        <input
          onChange={(e) => handleChange("mainCosts", e)}
          value={formData.mainCosts}
        />
      </td>
      <td>
        <input
          onChange={(e) => handleChange("estimatedProfit", e)}
          value={formData.estimatedProfit}
        />
      </td>
    </tr>
  );
}
