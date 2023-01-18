import React, { useState } from "react";
import "./style.scss";
const message = {
  info: null,
};
const MessageBox = () => {
  const [easein, setEaseIn] = useState(false);
  const [content, setContent] = useState("");
  const info = (content) => {
    setEaseIn(true);
    setContent(content);
    setTimeout(() => {
      setEaseIn(false);
    }, 2000);
  };
  message.info = info;
  return (
    <div className={`messagebox ${easein ? "easein" : ""}`}>
      <div className="content">
        <span>{content}</span>
      </div>
    </div>
  );
};

export { MessageBox, message };
