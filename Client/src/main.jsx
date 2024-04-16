import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store/index.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
);
