const eID = {
  id: 21526,
  rowName: "31c13086-3da7-453b-9a2c-d2f26250d681"
};
const API_URL = `http://185.244.172.108:8081/v1/outlay-rows/entity/${eID.id}/row`;
export const API = {
  getTreeRows: {
    method: "GET",
    url: API_URL + `/list`
  },
  createRowInEntity: {
    method: "POST",
    url: API_URL + `/create`
  },
  updateRow: {
    method: "POST",
    url: (rID: number) => API_URL + `/${rID}/update`
  },
  deleteRow: {
    method: "DELETE",
    url: (rID: number) => API_URL + `/${rID}/delete`
  }
};

export const fetchApiData = (method: string, action: string, body?: string) => {
  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      accept: "*/*"
    },
    body: body
  };
  return fetch(action, options)
    .then((response) => {
      if (response) {
        return response.json();
      } else {
        throw new Error("Empty response");
      }
    })
    .catch((err) => console.error(err));
};
