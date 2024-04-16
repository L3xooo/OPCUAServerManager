import { configureStore } from "@reduxjs/toolkit";
import aasServerReducer from "../../features/aas-server/AASServerSlice";
import alertReducer from "../../features/alert/AlertSlice";
import opcuaServerReducer from "../../features/opcua-server/OPCUAServerSlice";

export const store = configureStore({
  reducer: {
    aasServer: aasServerReducer,
    alerts: alertReducer,
    opcuaServer: opcuaServerReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}),
});