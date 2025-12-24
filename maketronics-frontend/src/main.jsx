import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = document.getElementById("root");

if (!root) throw new Error("Root element not found");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* Toast container added here */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </BrowserRouter>
  </React.StrictMode>
);
