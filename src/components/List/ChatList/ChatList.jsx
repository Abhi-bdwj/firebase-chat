import React, { useEffect, useState } from "react";
import "./chatList.css";
import AddUser from "../../AddUser/AddUser";
import { useSelector } from "react-redux";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";

const ChatList = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [addmode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const addHandler = () => {
    setAddMode((prev) => !prev);
  };
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        if (res.exists()) {
          const items = res.data().chats || [];
          const promises = items.map(async (item) => {
            const userDocRef = doc(db, "users", item.receiverId);
            const userDocSnap = await getDoc(userDocRef);
            const user = userDocSnap.data();
            return { ...item, user };
          });
          const chatData = await Promise.all(promises);
          setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        }
      }
    );

    return () => {
      unsub();
    };
  }, [currentUser.id]);

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={addmode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={addHandler}
        />
      </div>
      {chats.map((chat) => (
        <div className="item" key={chat.chatId}>
          <img src={chat.user.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{chat.user.username}</span>
            <p style={{ color: "lightgray" }}>
              {chat.lastMessage || "No messages yet"}
            </p>
          </div>
        </div>
      ))}

      {addmode && <AddUser />}
    </div>
  );
};

export default ChatList;
