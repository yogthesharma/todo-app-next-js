import React, { useEffect, useState } from "react";
import styles from "../styles/ToDo/Profile.module.css";
import { useRouter } from "next/router";
import Fire from "../configs/firebase";
import { userDispatch } from "../lib/Context";
import firebase from "firebase/app";
import { Row, Col } from "react-bootstrap";

const Profile = ({ id }) => {
  const router = useRouter();
  const dispatch = userDispatch();
  const [values, setValues] = useState();
  const [oldVal, setOldVal] = useState();
  const [data, setData] = useState();

  // functions starts here
  const addTodo = async () => {
    if (!values) return alert("Todo Field Cant Be Empty.");
    if (oldVal) {
      await Fire.firestore()
        .collection("to-do-user")
        .doc(id)
        .update({
          todos: firebase.firestore.FieldValue.arrayRemove(oldVal),
        });
    }
    await Fire.firestore()
      .collection("to-do-user")
      .doc(id)
      .update({
        todos: firebase.firestore.FieldValue.arrayUnion(values),
      })
      .then((res) => router.reload())
      .catch((e) => console.log(e, "Some Error Occured"));
  };

  const editTodo = async (val) => {
    await setValues(val);
    await setOldVal(val);
    const btn = document.querySelector("#addBtn");
    btn.innerHTML = "Edit";
  };
  const deleteTodo = async (val) => {
    await Fire.firestore()
      .collection("to-do-user")
      .doc(id)
      .update({
        todos: firebase.firestore.FieldValue.arrayRemove(val),
      })
      .then((res) => router.reload())
      .catch((e) => console.log(e, "Some Error Occured"));
  };

  useEffect(() => {
    const userCheck = async () => {
      Fire.auth().onAuthStateChanged(function (user) {
        if (user) return;
        // alert("No User Authenticated");
        router.back();
      });
    };
    userCheck();
    const setDispatch = async () => {
      await dispatch({
        type: "NavType",
        payload: "logout",
      });
    };
    setDispatch();
    const getData = async () => {
      const user = await Fire.firestore()
        .collection("to-do-user")
        .doc(id)
        .get();
      console.log(user.data().todos);
      setData(user.data().todos);
    };
    getData();
  }, []);

  return (
    <div className={styles.profileDiv}>
      <div>
        <input
          placeholder="Add To Do"
          name="todo"
          value={values}
          onChange={(e) => setValues(e.target.value)}
        />
        <button id="addBtn" onClick={addTodo}>
          Add
        </button>
      </div>
      {data
        ? data.map((val) => (
            <div className={styles.data}>
              <Row style={{ width: "100%" }}>
                <Col xs={12} md={8}>
                  <h5>{val}</h5>
                </Col>
                <Col xs={6} md={2}>
                  <a onClick={() => editTodo(val)}>Edit ToDo</a>
                </Col>
                <Col xs={6} md={2}>
                  <a onClick={() => deleteTodo(val)}>Delete ToDo</a>
                </Col>
              </Row>
            </div>
          ))
        : null}
    </div>
  );
};

export async function getStaticProps(context) {
  const userData1 = context.params.profile;
  const userData = await Fire.firestore()
    .collection("to-do-user")
    .where("email", "==", userData1)
    .get();
  let id;
  userData.forEach((snap) => (id = snap.id));
  return {
    props: {
      id,
    },
  };
}

export async function getStaticPaths() {
  const arr = [];
  const users = await Fire.firestore().collection("to-do-user").get();
  users.forEach(async (snap) => await arr.push(snap.data().email));
  console.log(arr);
  const paths = arr.map((post) => ({
    params: { profile: post },
  }));
  return {
    paths,
    fallback: false,
  };
}

export default Profile;
