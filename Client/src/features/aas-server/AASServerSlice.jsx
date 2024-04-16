import { createSlice } from "@reduxjs/toolkit";

const AASServerSlice = createSlice({
  name: "aasServer",
  initialState: {
    selectedServer: null,
  },
  reducers: {
    selectServer: (state, action) => {
      state.selectedServer = action.payload.selectedServer;
    }
  }
});

export const {selectServer} = AASServerSlice.actions;
export const selectedServerSelector = (state) => state.aasServer.selectedServer;
export default AASServerSlice.reducer;