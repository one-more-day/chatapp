const Navbar = () => {
  const name = "Jone";
  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">
        <img src="" alt="" />
        <span>{name}</span>
        <button>logout</button>
      </div>
    </div>
  );
};

export default Navbar;
