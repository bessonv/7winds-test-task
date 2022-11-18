import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { TableData } from "../interfaces/data.interface";
import mockData from "../mockData";
import { API, fetchApiData } from "../api/api";

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
    fetchApiData(API.getTreeRows.method, API.getTreeRows.url).then(
      (response) => {
        if (response) {
          setDataState(response);
        }
      }
    );
    // setDataState(mockData);
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
  const addRow = async (rowData: TableData, parentId: number | null) => {
    let newDataState = [] as TableData[];
    // for local
    // *********
    // const min = Math.ceil(4000);
    // const max = Math.floor(5000);
    // const newId = Math.floor(Math.random() * (max - min) + min);
    // rowData = { ...rowData, id: newId };
    // *********
    rowData = { ...rowData, parentId: parentId };
    const fetchedRow = await fetchApiData(
      API.createRowInEntity.method,
      API.createRowInEntity.url,
      JSON.stringify(rowData)
    );
    if (parentId) {
      newDataState = iterateData(dataState, parentId, (row: TableData) => {
        // make api call
        if (row.child) {
          row.child.push(fetchedRow);
        } else {
          row = { ...row, child: [fetchedRow] };
        }
        return row;
      });
    } else {
      newDataState = [...dataState, fetchedRow];
    }
    setDataState(newDataState);
    setFormState(false);
  };
  const editRow = async (rowData: TableData, rowId: number) => {
    const fetchedRow = await fetchApiData(
      API.updateRow.method,
      API.updateRow.url(rowId),
      JSON.stringify(rowData)
    );
    if (fetchedRow.current) {
      const newDataState = iterateData(dataState, rowId, (row: TableData) => {
        return fetchedRow;
      });
      setDataState(newDataState);
    }
    setFormState(false);
  };
  const deleteRow = async (rowId: number) => {
    const response = await fetchApiData(
      API.deleteRow.method,
      API.deleteRow.url(rowId)
    );
    if (response) {
      const newDataState = filterData(dataState, rowId);
      setDataState(newDataState);
    }
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
