import addAvatar from "@/assets/addAvatar.png";
import Input from "@/components/Input";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "@/firebase";
import { message } from "@/global/MessageBox";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [isAvatar, setIsAvatar] = useState(false);
  const navigate = useNavigate();
  const onChange = () => {
    setIsAvatar(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const avatar = e.target[3].files[0];
    const storageRef = ref(storage, displayName);
    const uploadTask = uploadBytesResumable(storageRef, avatar);
    try {
      if (!avatar) throw Error("请上传头像");
      const res = await createUserWithEmailAndPassword(auth, email, password);

      uploadTask.on(
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(downloadURL);
            try {
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate("/");
            } catch (err) {
              console.log(err);
            }
          });
        }
      );

      message.info("success");
    } catch (err) {
      message.info(err.message);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat App</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <Input placeholder="displayname" />
          <Input placeholder="email" />
          <Input placeholder="password" />
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={onChange}
          />
          <label htmlFor="file">
            <img src={addAvatar} alt="" />
            {isAvatar ? <span>上传成功</span> : <span>Add an avatar</span>}
          </label>
          <button>Sign Up</button>
        </form>
        <p>You do have an account? Login</p>
      </div>
    </div>
  );
};
export default Register;
