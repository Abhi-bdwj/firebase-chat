import React, { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { uploadImageToCloudinary } from "../../lib/cloudinary";

const Login = () => {
  const [avatar, setAvatar] = useState({ file: null, url: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleAvatar = (event) => {
    if (event.target.files[0]) {
      setAvatar({
        file: event.target.files[0],
        url: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const validate = (data, type) => {
    let errors = {};
    if (type === "login") {
      if (!data.email) errors.email = "Email is required.";
      else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = "Invalid email.";
      if (!data.password) errors.password = "Password is required.";
    } else if (type === "register") {
      if (!data.username) errors.username = "Username is required.";
      if (!data.email) errors.email = "Email is required.";
      else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = "Invalid email.";
      if (!data.password) errors.password = "Password is required.";
      else if (data.password.length < 8)
        errors.password = "Password must be at least 8 characters.";
    }
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    const validationErrors = validate({ email, password }, "login");
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful.");
    } catch (error) {
      console.log(error.code);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    const { username, email, password } = Object.fromEntries(formData);

    const validationErrors = validate({ username, email, password }, "register");
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const imgUrl = avatar.file
        ? await uploadImageToCloudinary(avatar.file)
        : "";

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });
      toast.success("Account Created Successfully.");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" />
          {errors.email && <p className="error">{errors.email}</p>}
          <input type="password" placeholder="Password" name="password" />
          {errors.password && <p className="error">{errors.password}</p>}
          <button disabled={loading}>{loading ? "Loading..." : "Sign In"}</button>
        </form>
      </div>

      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" placeholder="Username" name="username" />
          {errors.username && <p className="error">{errors.username}</p>}
          <input type="text" placeholder="Email" name="email" />
          {errors.email && <p className="error">{errors.email}</p>}
          <input type="password" placeholder="Password" name="password" />
          {errors.password && <p className="error">{errors.password}</p>}
          <button disabled={loading}>
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
