import React, { useState } from "react";
import "./detail.css";
import { auth, db } from "../../lib/firebase";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../utils/userSlice";
import { toast } from "react-toastify";
import { changeBlock } from "../utils/chatSlice";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const Detail = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useSelector(
    (state) => state.chat
  );

  // States to toggle each section
  const [showChatSettings, setShowChatSettings] = useState(false);
  const [showPrivacyHelp, setShowPrivacyHelp] = useState(false);
  const [showSharedPhotos, setShowSharedPhotos] = useState(false);
  const [showSharedFiles, setShowSharedFiles] = useState(false);

  const logoutHandler = () => {
    auth.signOut();
    dispatch(logOut());
    toast.info("You are logged Out", { position: "bottom-center" });
  };

  const handleBlock = async () => {
    if (!user) return;
    const userDocRef = doc(db, "users", currentUser.id);
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      dispatch(changeBlock());
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle handlers for each section
  const toggleChatSettings = () => setShowChatSettings((prev) => !prev);
  const togglePrivacyHelp = () => setShowPrivacyHelp((prev) => !prev);
  const toggleSharedPhotos = () => setShowSharedPhotos((prev) => !prev);
  const toggleSharedFiles = () => setShowSharedFiles((prev) => !prev);

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || ".avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        {/* Chat Settings Toggle */}
        <div className="option">
          <div className="title" onClick={toggleChatSettings}>
            <span>Chat Settings</span>
            <img
              src={showChatSettings ? "./arrowUp.png" : "./arrowDown.png"}
              alt=""
            />
          </div>
          {showChatSettings && (
            <div className="settingsContent">
              {/* Add your content for Chat Settings here */}
              <p>Chat Settings Content</p>
            </div>
          )}
        </div>

        {/* Privacy & Help Toggle */}
        <div className="option">
          <div className="title" onClick={togglePrivacyHelp}>
            <span>Privacy & Help</span>
            <img
              src={showPrivacyHelp ? "./arrowUp.png" : "./arrowDown.png"}
              alt=""
            />
          </div>
          {showPrivacyHelp && (
            <div className="privacyContent">
              {/* Add your content for Privacy & Help here */}
              <p>Privacy & Help Content</p>
            </div>
          )}
        </div>

        {/* Shared Photos Toggle */}
        <div className="option">
          <div className="title" onClick={toggleSharedPhotos}>
            <span>Shared Photos</span>
            <img
              src={showSharedPhotos ? "./arrowUp.png" : "./arrowDown.png"}
              alt=""
            />
          </div>
          {showSharedPhotos && (
            <div className="photos">
              <div className="photoItem">
                <div className="photoDetail">
                  <img
                    src="https://images.unsplash.com/photo-1461696114087-397271a7aedc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                  <span>photo_2024_12.png</span>
                </div>
                <img src="download.png" alt="" className="icon" />
              </div>
              <div className="photoItem">
                <div className="photoDetail">
                  <img
                    src="https://images.unsplash.com/photo-1461696114087-397271a7aedc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                  <span>photo_2024_12.png</span>
                </div>
                <img src="download.png" alt="" className="icon" />
              </div>
              <div className="photoItem">
                <div className="photoDetail">
                  <img
                    src="https://images.unsplash.com/photo-1461696114087-397271a7aedc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                  <span>photo_2024_12.png</span>
                </div>
                <img src="download.png" alt="" className="icon" />
              </div>
              <div className="photoItem">
                <div className="photoDetail">
                  <img
                    src="https://images.unsplash.com/photo-1461696114087-397271a7aedc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                  <span>photo_2024_12.png</span>
                </div>
                <img src="download.png" alt="" className="icon" />
              </div>
              {/* Repeat photo items as needed */}
            </div>
          )}
        </div>

        {/* Shared Files Toggle */}
        <div className="option">
          <div className="title" onClick={toggleSharedFiles}>
            <span>Shared Files</span>
            <img
              src={showSharedFiles ? "./arrowUp.png" : "./arrowDown.png"}
              alt=""
            />
          </div>
          {showSharedFiles && (
            <div className="filesContent">
              {/* Add your content for Shared Files here */}
              <p>Shared Files Content</p>
            </div>
          )}
        </div>

        <div className="buttonContainer">
          <button onClick={handleBlock}>
            {isCurrentUserBlocked
              ? "You are Blocked"
              : isReceiverBlocked
              ? "User Blocked"
              : "Block User"}
          </button>
          <button className="logout" onClick={logoutHandler}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
