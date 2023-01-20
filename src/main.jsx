import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MessageBox } from "@/global/MessageBox";
import { AuthContextProvider } from "@/context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ChatContextProvider>
      <App />
    </ChatContextProvider>
  </AuthContextProvider>
);

(function initModalContainer() {
  const ele = document.body.appendChild(document.createElement("div"));
  ReactDOM.createRoot(ele).render(<MessageBox />);
})();
