import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MessageBox } from "@/global/MessageBox";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
(function initModalContainer() {
  const ele = document.body.appendChild(document.createElement("div"));
  ReactDOM.createRoot(ele).render(<MessageBox />);
})();
