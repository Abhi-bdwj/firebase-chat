import React, { useEffect, useState } from "react";
import "./chatList.css";
import AddUser from "../../AddUser/AddUser";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { changeChatWithUser } from "../../utils/chatSlice";

const ChatList = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [addmode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");
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

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });
    const chatIndex = userChats.findIndex((item) => item.chatId == chat.chatId);
    userChats[chatIndex].isSeen = true;

    const UserChatsRef = doc(db, "userchats", currentUser.id);
    try {
      await updateDoc(UserChatsRef, {
        chats: userChats,
      });
      dispatch(
        changeChatWithUser({
          chatId: chat.chatId,
          user: chat.user,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const filteredChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );
  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input
            type="text"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <img
          src={addmode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={addHandler}
        />
      </div>
      {filteredChats.map((chat) => (
        <div
          className="item"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{
            backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
          }}
        >
          <img
            src={
              chat.user.blocked.includes(currentUser.id)
                ? "./avatar.png"
                : chat.user.avatar || "./avatar.png"
            }
            alt=""
          />
          <div className="texts">
            <span>
              {chat.user.blocked.includes(currentUser.id)
                ? "User"
                : chat.user.username}
            </span>
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
