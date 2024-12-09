import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import "./chat.css";
const Chat = () => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [text, setText] = useState("");
  const handleEmoji = (event) => {
    setText((prev) => prev + event.emoji);
  };
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Jane doe</span>
            <p>Lorem ipsum dolor sit </p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              architecto nostrum quibusdam eaque sequi vero ab at. Iste nulla
              quos nihil voluptates delectus culpa optio eum quisquam,
              perferendis a architecto.
            </p>
            <span> 1 min ago</span>
          </div>
        </div>
        <div className="own message">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              architecto nostrum quibusdam eaque sequi vero ab at. Iste nulla
              quos nihil voluptates delectus culpa optio eum quisquam,
              perferendis a architecto.
            </p>
            <span> 1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              architecto nostrum quibusdam eaque sequi vero ab at. Iste nulla
              quos nihil voluptates delectus culpa optio eum quisquam,
              perferendis a architecto.
            </p>
            <span> 1 min ago</span>
          </div>
        </div>
        <div className="own message">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              architecto nostrum quibusdam eaque sequi vero ab at. Iste nulla
              quos nihil voluptates delectus culpa optio eum quisquam,
              perferendis a architecto.
            </p>
            <span> 1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              architecto nostrum quibusdam eaque sequi vero ab at. Iste nulla
              quos nihil voluptates delectus culpa optio eum quisquam,
              perferendis a architecto.
            </p>
            <span> 1 min ago</span>
          </div>
        </div>
        <div className="own message">
          <div className="texts">
            <img
              src="https://media.idownloadblog.com/wp-content/uploads/2021/09/Apple-September-Event-California-Streaming-BasicAppleGuy-iDownloadBlog-6K-No-Logo.png"
              alt=""
            />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              architecto nostrum quibusdam eaque sequi vero ab at. Iste nulla
              quos nihil voluptates delectus culpa optio eum quisquam,
              perferendis a architecto.
            </p>
            <span> 1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="camera.png" alt="" />
          <img src="mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setShowEmoji((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={showEmoji} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chat;
