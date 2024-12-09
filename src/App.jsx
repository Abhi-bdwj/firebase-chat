import { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import Chat from "./components/Chat/Chat";
import Detail from "./components/Detail/Detail";
import List from "./components/List/List";
import Login from "./components/Login/Login";
import Notification from "./components/Notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import appStore from "./components/utils/appStore";
import { fetchUserInfo } from "./components/utils/userSlice";

const AppContent = () => {
  const dispatch = useDispatch();
  const [authStatusChecked, setAuthStatusChecked] = useState(false);
  const { currentUser, isLoading } = useSelector((state) => state.user);
  const { chatId } = useSelector((state) => state.chat);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user && currentUser?.uid !== user.uid) {
        dispatch(fetchUserInfo(user?.uid));
      }
      setAuthStatusChecked(true);
    });

    return () => {
      unSubscribe();
    };
  }, [dispatch]);
  if (!authStatusChecked) {
    return <div className="loading">Loading...</div>;
  }

  return isLoading ? (
    <div className="loading">Loading...</div>
  ) : (
    <div className="container">
      {!currentUser ? (
        <Login />
      ) : (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Detail />}
        </>
      )}
      <Notification />
    </div>
  );
};

const App = () => {
  return (
    <Provider store={appStore}>
      <AppContent />
    </Provider>
  );
};

export default App;
