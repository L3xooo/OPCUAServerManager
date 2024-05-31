import fetchData from "../../utils/apiUtils";
import { uploadData } from "../../utils/apiUtils";

const HEADERS = {"Content-type" : "application/json"};

const SUBMODELS_ENDPOINT = import.meta.env.VITE_SUBMODELS_ENDPOINT;
const SUBMODELS_BY_ID_ENDPOINT = import.meta.env.VITE_SUBMODELS_BY_ID_ENDPOINT;
const ADD_SERVER_ENDPOINT = import.meta.env.VITE_BACKEND_URL;

export const getSubmodels = async (serverEndpoint) => {
  const response = await fetchData(serverEndpoint + SUBMODELS_ENDPOINT, "GET");
  ///console.log(response);
  return response;
};

export const getSubmodelById = async (serverEndpoint, submodelId) => {
  const url = serverEndpoint + SUBMODELS_ENDPOINT + submodelId + SUBMODELS_BY_ID_ENDPOINT;
  const response = await fetchData(url, "GET");
  //console.log(response);
  return response;
};

export const addServer = async (e, data, url) => {
  e.preventDefault();
  const response = await uploadData(ADD_SERVER_ENDPOINT, JSON.stringify({data: data, url: url}), HEADERS);
  return response;
};
