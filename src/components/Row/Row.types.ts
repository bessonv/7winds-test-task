import { TableData } from "../../interfaces/data.interface";

export default interface RowProps {
  data: TableData;
  nestLevel: number;
  showAddForm: (parentId: number | null) => void;
  showEditForm: (rowId: number) => void;
}
