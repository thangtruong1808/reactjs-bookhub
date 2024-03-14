import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./custom.scss";

import { RouterProvider } from "react-router-dom";
import router from "./components/routes";
import AppContextProvider from "./components/context/bookContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </React.StrictMode>
);
