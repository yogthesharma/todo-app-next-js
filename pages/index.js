import { useState, useEffect } from "react";
import styles from "../styles/ToDo/Login.module.css";
import { useRouter } from "next/router";
import { userDispatch } from "../lib/Context";
// firebase config
import Fire from "../configs/firebase";

export default function Home() {
  const dispatch = userDispatch();
  const router = useRouter();
  const initVals = {
    email: "",
    password: "",
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
    await Fire.auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(async (res) => {
        await router.push("/profile", `/${values.email}`);
      })
      .catch((e) => {
        alert(e.message);
        return;
      });
  };
  //
  useEffect(() => {
    const setNav = async () => {
      await dispatch({
        type: "NavType",
        payload: "signin",
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
        <button onClick={btnClick}>Login</button>
      </div>
    </>
  );
}
