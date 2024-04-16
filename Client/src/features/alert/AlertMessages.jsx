export const ALERT_MESSAGES = {
  SUCCESS_ADD : "Your server was succesfully downloaded and added to the Database!",
  SUCCESS_RUN : "Your server was successfully started!",
  SUCCESS_DELETE : "Your server was successfully deleted from the Database!",
  SUCCESS_STOP : "Your server was successfully stopped!",
  SUCCESS_IMPORT : "Your server was successfully added to the list of AAS Servers.",

  INFO_ADD : "Your server was successfully dowloaded but is already in the Database!",

  ERROR_ADD : "An Error occured during the download or adding to the Database!",
  ERROR_RUN : "An error occurred during the server start!",
  ERROR_DELETE : "An error occurred during the server delete or removing from the Database!",
  ERROR_FETCH : "Failed to fetch data. Please check your network connection and try again.",
};


export const AAS_ALERT_MESSAGES = {
  SUCCESS_DOWNLOAD : "Your server was succesfully downloaded and added to the database!",
  ERROR_DOWNLOAD : "An Error occured during the download, Filename is not defined!",
  INFO_DOWNLOAD : "Server was successfully downloaded but its already in database!",

  SUCCESS_IMPORT : "Your server was successfully added to the list of AAS Servers.",
  ERROR_IMPORT: "An Error occured while adding AAS server to the database!",

  SUCCESS_DELETE : "Your server was successfully deleted from the database!",
  ERROR_DELETE: "An Error occured while deleting AAS server from the database!",

  ERROR_FILE : "An Error occured while loading file, extension is not valid!"
};

export const OPCUA_SERVER_ALERT_MESSAGES = {
  SUCCESS_RUN : "Your server was successfully started!",
  SUCCESS_STOP : "Your server was successfully stopped!",
  SUCCESS_DELETE : "Your server was successfully deleted from the Database!",

  ERROR_RUN : "An error occurred during the server start or adding to the Database!",
  ERROR_STOP : "An error occurred during the server stop or updating in the Database!",
  ERROR_DELETE : "An error occurred during the server delete or removing from the Database!",
};