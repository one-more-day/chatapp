import Input from "@/components/Input";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "@/firebase";
import { Link, useNavigate } from "react-router-dom";
import { message } from "@/global/MessageBox";
const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      message.info("success");
      navigate("/");
    } catch (err) {
      message.info(err.message);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat App</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <Input placeholder="email" />
          <Input placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <button>Sign In</button>
        </form>
        <p>You don't have an account? <Link to={'/register'}>Register</Link></p>
      </div>
    </div>
  );
};
export default Login;
