import React, { useState, useEffect } from "react";
import styles from "../styles/ToDo/Login.module.css";
import { useRouter } from "next/router";
import { userDispatch } from "../lib/Context";
import Fire from "../configs/firebase";

const Signup = () => {
  const router = useRouter();
  const dispatch = userDispatch();

  const initVals = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [values, setValues] = useState(initVals);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const btnClick = async () => {
    if (values.password !== values.confirmPassword)
      return alert("Password Not Confirmed!!");
    if (!values.email || !values.password || !values.confirmPassword)
      return alert("Fill All The Fields");

    await Fire.auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(async (res) => {
        Fire.firestore()
          .collection("to-do-user")
          .add({
            email: values.email,
          })
          .then(async (res) => {
            await router.push("/[profile]", `/${values.email}`);
          })
          .catch((e) => alert(e.message));
      })
      .catch((e) => alert(e.message));
  };

  useEffect(() => {
    const setNav = async () => {
      await dispatch({
        type: "NavType",
        payload: "login",
      });
    };
    setNav();
  }, []);

  return (
    <>
      <div className={styles.loginDiv}>
        <div>
          <p>Username</p>
          <input
            placeholder="Username"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Password</p>
          <input
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Confirm Password</p>
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button onClick={btnClick}>Signup</button>
      </div>
    </>
  );
};

export default Signup;
