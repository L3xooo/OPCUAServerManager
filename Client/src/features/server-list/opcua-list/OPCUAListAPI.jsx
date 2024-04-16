import fetchData from "../../../utils/apiUtils";

const URL = import.meta.env.VITE_BACKEND_URL;
const RUN_ENDPOINT = "/run-server";
const STOP_ENDPOINT = "/stop-server";

export const getServers = async () => {
  const response = await fetchData(URL, "GET");
  return response;
};

export const deleteServer = async (event, id) => {
  event.stopPropagation();
  const response = await fetchData(URL + id, "DELETE");
  console.log(response);
  return response; 
};

export const runServer = async (event, id) => {
  event.stopPropagation();
  const response = await fetchData(URL + id + RUN_ENDPOINT, "PUT");
  console.log(response);
  return response;
};

export const stopServer = async (event, id) => {
  event.stopPropagation();
  const response = await fetchData(URL + id + STOP_ENDPOINT, "PUT");
  return response;
};
