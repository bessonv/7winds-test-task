import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { TableData, AddResponse, EditResponse, DeleteResponse } from "../interfaces/data.interface";
import mockData from "../mockData";
import { API, fetchApiData } from "../api/api";

export interface IAppContext {
  data: TableData[];
  isFormOppend: boolean;
  isHidden: boolean;
  addRow?: (rowData: TableData, parentId: number | null) => void;
  editRow?: (rowData: TableData, rowId: number) => void;
  deleteRow?: (rowId: number) => void;
  toggleForm?: (value: boolean) => void;
  hideIcons?: (value: boolean) => void;
}

export const AppContext = createContext<IAppContext>({
  data: [],
  isFormOppend: false,
  isHidden: true
});

export const AppContextProvider = ({
  data,
  isFormOppend,
  children
}: PropsWithChildren<IAppContext>): JSX.Element => {
  const [dataState, setDataState] = useState<TableData[]>(data);
  const [formState, setFormState] = useState<boolean>(false);
  const [isIconsHidden, setIconsHidden] = useState<boolean>(true);
  useEffect(() => {
    fetchApiData(API.getTreeRows.method, API.getTreeRows.url).then(
      (response: TableData[]) => {
        if (response) {
          setDataState(response);
        }
      }
    );
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
        return { ...e, child: children };
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
  const updateData = (newData: TableData[], stateData: TableData[]) => {
    if (newData.length == 0) {
      return setDataState(stateData);
    }
    for(const el of newData) {
      if (!el.id) return el;
      const updatedData = iterateData(stateData, el.id, (row: TableData) => {
        return { ...row, ...el };
      });

      setDataState(updatedData);
    }
  }
  const addRow = async (rowData: TableData, parentId: number | null) => {
    let newDataState = [];
    rowData = { ...rowData, parentId: parentId };
    const response: AddResponse = await fetchApiData(
      API.createRowInEntity.method,
      API.createRowInEntity.url,
      JSON.stringify(rowData)
    );
    console.log(response);
    if (!response.current) {
      return setFormState(false);
    }
    if (parentId) {
      newDataState = iterateData(dataState, parentId, (row: TableData) => {
        if (row.child) {
          row.child.push(response.current);
        } else {
          row = { ...row, child: [response.current] };
        }
        return row;
      });
    } else {
      newDataState = [...dataState, response.current];
    }
    updateData(response.changed, newDataState);
    setFormState(false);
  };
  const editRow = async (rowData: TableData, rowId: number) => {
    const response: EditResponse = await fetchApiData(
      API.updateRow.method,
      API.updateRow.url(rowId),
      JSON.stringify(rowData)
    );
    console.log(response);
    if (response.current) {
      const newDataState = iterateData(dataState, rowId, (row: TableData) => {
        return { ...row, ...response.current };
      });
      updateData(response.changed, newDataState);
    }
    setFormState(false);
  };
  const deleteRow = async (rowId: number) => {
    const response: DeleteResponse = await fetchApiData(
      API.deleteRow.method,
      API.deleteRow.url(rowId)
    );
    console.log(response);
    const newDataState = filterData(dataState, rowId);
    updateData(response.changed, newDataState);
  };
  const toggleForm = (value: boolean) => {
    setFormState(value);
  };
  const hideIcons = (value: boolean) => {
    setIconsHidden(value);
  }
  return (
    <AppContext.Provider
      value={{
        data: dataState,
        isFormOppend: formState,
        isHidden: isIconsHidden,
        addRow,
        editRow,
        deleteRow,
        toggleForm,
        hideIcons
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
