import { createSlice } from "@reduxjs/toolkit";

const OPCUAServerSlice = createSlice({
  name: "opcuaServer",
  initialState: {
    showServerModal: false,
    server : {}
  },
  reducers: {
    showOPCUAServer: (state, action) => {
      state.showServerModal = true;
      state.server = action.payload.server;
    },
    hideOPCUAServer: (state) => {
      state.showServerModal = false;
      state.server = {};
    }
  }
});

export const {showOPCUAServer, hideOPCUAServer} = OPCUAServerSlice.actions;
export const showOPCUAServerSelector = (state) => state.opcuaServer;
export default OPCUAServerSlice.reducer;