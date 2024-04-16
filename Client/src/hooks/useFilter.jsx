import { useState, useEffect } from "react";
import { activeButtonFilter, searchInputFilter } from "../utils/filterUtils";

const useFilter = (data, searchString, searchParameter, filterParameter = "", activeFilter = "") => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (activeFilter == "" && filterParameter == "") {
      setFilteredData(searchInputFilter(data, searchString, searchParameter));
    } else {        
      const filteredByFilter = activeButtonFilter(data, activeFilter, filterParameter);
      setFilteredData(searchInputFilter(filteredByFilter, searchString, searchParameter));
    }
  }, [data, searchString, activeFilter]);

  return filteredData;
};

export default useFilter;