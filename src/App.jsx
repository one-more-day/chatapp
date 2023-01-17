import { useState } from "react";
import Register from "@/pages/Register";
import "./style.scss";
import Login from "@/pages/Login";
import Home from "@/pages/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
