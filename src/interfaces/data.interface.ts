export interface TableData {
  id: number | null;
  rowName: string;
  total?: number;
  salary: number;
  mimExploitation?: number;
  machineOperatorSalary?: number;
  materials: number;
  mainCosts: number;
  supportCosts?: number;
  equipmentCosts?: number;
  overheads?: number;
  estimatedProfit?: number;
  parentId?: number | null;
  child?: TableData[];
}

export interface AddResponse {
  changed: TableData[];
  current: TableData;
}

export interface EditResponse {
  changed: TableData[];
  current: TableData;
}

export interface DeleteResponse {
  changed: TableData[];
  current: TableData | null;
}
