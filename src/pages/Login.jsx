import addAvatar from "@/assets/addAvatar.png";
import Input from "@/components/Input";
const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat App</span>
        <span className="title">Login</span>
        <form>
          <Input placeholder="email" />
          <Input placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <button>Sign In</button>
        </form>
        <p>You don't have an account? Register</p>
      </div>
    </div>
  );
};
export default Login;
