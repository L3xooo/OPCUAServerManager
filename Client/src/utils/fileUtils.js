export const checkFileValidExtenstion = (filename, extension) => {
  if (filename) {
    const regexPattern = new RegExp(`\\.${extension}$`, "i");
    return regexPattern.test(filename.name);
  }
};