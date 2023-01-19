import React, { useContext, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "@firebase/firestore";
import { db } from "@/firebase";
import { message } from "@/global/MessageBox";
import { AuthContext } from "@/context/AuthContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setUser(null);
        message.info("无此用户");
        return;
      }
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      message.info(error.message);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSelect = async () => {
    const combinId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinId), { messages: [] });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      message.info(err.message);
    }
    setUser(null);
    setUsername("");
  };
  return (
    <div className="search">
      <div className="searchFrom">
        <input
          type="text"
          placeholder="find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div
        style={{
          transition: "all .5s ease",
          position: "absolute",
          backgroundColor: "#5d5b8d",
          left: 10,
          width: "90%",
          borderRadius: "0 0 10px 10px",
          transformOrigin: "0 0",
          transform: `${user ? "scaleY(1)" : "scaleY(0)"}`,
        }}
      >
        {user && (
          <div
            className="userChat"
            style={{
              color: "#000",
              padding: "8px 5px",
            }}
            onClick={handleSelect}
          >
            <img src={user.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{user.displayName}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
