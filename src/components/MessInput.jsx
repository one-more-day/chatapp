import React from "react";
import Img from "@/assets/img.png";
import Attach from "@/assets/attach.png";
const MessInput = () => {
  return (
    <div className="messinput">
      <input type="text" placeholder="Type something..." />
      <div className="send">
        <img src={Attach} alt="" />
        <input type="file" style={{ display: "none" }} id="messfile" />
        <label htmlFor="messfile">
          <img src={Img} alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default MessInput;
