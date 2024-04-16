import fetchData from "../../utils/apiUtils";

const URL = import.meta.env.VITE_BACKEND_URL;

const getScriptData = async (event, id) => {
  const response = await fetchData(URL + id, "GET");
  return response;
};

export default getScriptData;