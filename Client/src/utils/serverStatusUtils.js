export const serverStatusHelper = (status) => {
  switch (status) {
  case "Online":
    return true;
  case "Offline":
    return false;
  default:
    return null;
  }
};
