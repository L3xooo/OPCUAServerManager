const fetchData = async (url, method) => {
  const parameters = {
    method: method
  };
  try {
    const response = await fetch(url, parameters);
    console.log(response);
    if (response.headers.get("Content-length") === 0)
      return response;
    return response.json();
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw (error);
  }
};

export const uploadData = async (url, body, headers = null) => {
  console.log(body);
  try {
    const uploadHeaders = headers ? headers : {}; 
    const response = await fetch(url, {
      method: "POST",
      body : body,
      headers : uploadHeaders
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error uploading data: ", error);
    throw (error);
  }
};

export default fetchData;