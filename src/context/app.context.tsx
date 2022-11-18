import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { TableData } from "../interfaces/data.interface";
import mockData from "../mockData";

export interface IAppContext {
  data: TableData[];
  isFormOppend: boolean;
  addRow?: (rowData: TableData, parentId: number | null) => void;
  editRow?: (rowData: TableData, rowId: number) => void;
  deleteRow?: (rowId: number) => void;
  toggleForm?: (value: boolean) => void;
}

export const AppContext = createContext<IAppContext>({
  data: [],
  isFormOppend: false
});

export const AppContextProvider = ({
  data,
  isFormOppend,
  children
}: PropsWithChildren<IAppContext>): JSX.Element => {
  const [dataState, setDataState] = useState<TableData[]>(data);
  const [formState, setFormState] = useState<boolean>(false);
  useEffect(() => {
    setDataState(mockData);
  }, []);
  const iterateData = (
    data: TableData[],
    rowId: number,
    callback: (oldData: TableData) => TableData
  ) => {
    return data.map((e) => {
      if (e.id === rowId) {
        return callback(e);
      } else if (e.child && e.child.length > 0) {
        const children: TableData[] = iterateData(e.child, rowId, (c) => {
          return callback(c);
        });
        return { ...e, child: children } as TableData;
      } else {
        return e;
      }
    });
  };
  const filterData = (data: TableData[], rowId: number) => {
    return data.filter((e, i) => {
      if (e.id === rowId) {
        return false;
      }
      if (e.child) {
        const children: TableData[] = filterData(e.child, rowId);
        data[i].child = children;
        return true;
      }
      return true;
    });
  };
  const addRow = (rowData: TableData, parentId: number | null) => {
    let newDataState = [] as TableData[];
    // for local
    // *********
    const min = Math.ceil(4000);
    const max = Math.floor(5000);
    const newId = Math.floor(Math.random() * (max - min) + min);
    rowData = { ...rowData, id: newId };
    // *********
    if (parentId) {
      newDataState = iterateData(dataState, parentId, (row: TableData) => {
        // make api call
        if (row.child) {
          row.child.push(rowData);
        } else {
          row = { ...row, child: [rowData] };
        }
        return row;
      });
    } else {
      newDataState = [...dataState, rowData];
    }
    setDataState(newDataState);
    setFormState(false);
  };
  const editRow = (rowData: TableData, rowId: number) => {
    const newDataState = iterateData(dataState, rowId, (row: TableData) => {
      return rowData;
    });

    setDataState(newDataState);
    setFormState(false);
  };
  const deleteRow = (rowId: number) => {
    const newDataState = filterData(dataState, rowId);
    setDataState(newDataState);
  };
  const toggleForm = (value: boolean) => {
    setFormState(value);
  };
  return (
    <AppContext.Provider
      value={{
        data: dataState,
        isFormOppend: formState,
        addRow,
        editRow,
        deleteRow,
        toggleForm
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
