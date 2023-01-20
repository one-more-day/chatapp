import React, { useState, useContext } from "react";
import Img from "@/assets/img.png";
import Attach from "@/assets/attach.png";
import { ChatContext } from "@/context/ChatContext";
import { AuthContext } from "@/context/AuthContext";
import {
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { db, storage } from "@/firebase";
import { v4 as uuid } from "uuid";
import { message } from "@/global/MessageBox";
const MessInput = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const handleSend = async () => {
    if (!img && !text) {
      message.info("输入为空");
      return;
    }
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            try {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  data: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            } catch (err) {
              message.info(err);
            }
          });
        }
      );
    } else {
      try {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            data: Timestamp.now(),
          }),
        });
      } catch (error) {
        message.info(error.message);
      }
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImg(null);
  };
  return (
    <div className="messinput">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="messfile"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="messfile">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default MessInput;
