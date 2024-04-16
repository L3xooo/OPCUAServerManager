import { createSlice } from "@reduxjs/toolkit";

const AlertSlice = createSlice({
  name: "alerts",
  initialState: {
    showAlert: false,
    message: "",
    type: "",
    icon: "",
  },
  reducers: {
    showAlert: (state, action) => {
      state.showAlert = true;
      state.message = action.payload.message || "";
      state.type = action.payload.type || "info";
      state.icon = action.payload.icon;
    },
    hideAlert: (state) => {
      state.showAlert = false;
      state.message = "";
      state.type = "";
    }
  }
});

export const {showAlert,hideAlert} = AlertSlice.actions;
export const showAlertSelector = (state) => state.alerts;
export default AlertSlice.reducer;