import { serverStatusHelper } from "./serverStatusUtils";

export const searchInputFilter = (data, searchInput, parameter) => {
  if (searchInput) {
    return data.filter((item) => {
      return item[parameter].toLowerCase().includes(searchInput.toLowerCase());
    });
  } else {
    return data;
  }
};

export const activeButtonFilter = (data, activeFilter, parameter) => {
  const booleanValue = serverStatusHelper(activeFilter);
  if (booleanValue) {
    return data.filter((item) => {
      return item[parameter] == booleanValue;
    });
  }
  return data;
};

