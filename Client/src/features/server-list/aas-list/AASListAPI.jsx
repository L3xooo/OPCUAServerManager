import {uploadData} from "../../../utils/apiUtils";
import fetchData from "../../../utils/apiUtils";

const URL = import.meta.env.VITE_AAS_REGISTRY_SERVICE;
const ADD_URL = import.meta.env.VITE_AAS_SERVER_SERVICE + "/shells/aasx";

export const getServers = async () => {
  const response = await fetchData(URL, "GET");
  return response;
};

export const deleteServer = async (event, url) => {
  event.stopPropagation();
  const response = await fetchData(url, "DELETE");
  return response;
};

export const addServer = async (body) => {
  const response = await uploadData(ADD_URL, body);
  return response;
};