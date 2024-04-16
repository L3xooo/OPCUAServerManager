export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function removeUrlEndpoint(url) {
  const regexPattern = /\/[^\/]+$/;
  return url.replace(regexPattern,"");
}