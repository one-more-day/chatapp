import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import Chats from "@/components/Chats";
import ArrowRight from "@/assets/chevron-right.svg";
import ArrowLeft from "@/assets/chevron-left.svg";
import { useState } from "react";

const Sidebar = () => {
  const [isCollapse, setCollapse] = useState(false);
  return (
    <div className={`sidebar ${isCollapse ? 'collapse': ''}`}>
      <Navbar />
      <Search />
      <Chats />
      <div className="collapse">
        <button onClick={() => setCollapse(!isCollapse)}>
          {isCollapse ? <img src={ArrowRight} /> : <img src={ArrowLeft} />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
