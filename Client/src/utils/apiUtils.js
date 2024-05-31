const fetchData = async (url, method) => {
  const parameters = {
    method: method
  };
  
  try {
    const response = await fetch(url, parameters);
    if (response.headers.get("content-length") === "0")
      return response;
    return response.json();
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw (error);
  }
};

export const uploadData = async (url, body, headers = null) => {
  try {
    const uploadHeaders = headers ? headers : {}; 
    const response = await fetch(url, {
      method: "POST",
      body : body,
      headers : uploadHeaders
    });
    //console.log(response);
    return response;
  } catch (error) {
    console.error("Error uploading data: ", error);
    throw (error);
  }
};

export default fetchData;