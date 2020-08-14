import styles from "../styles/Nav.module.css";
import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCount, userDispatch } from "../lib/Context";
import Fire from "../configs/firebase";

const Navbars = () => {
  const router = useRouter();
  const count = useCount();

  console.log(count);
  const dispatch = userDispatch();

  // logging out operation
  const logOut = async () => {
    await router.push("/");
    await dispatch({
      type: "NavType",
      payload: true,
    });
    await Fire.auth()
      .signOut()
      .catch((e) => {
        console.log(e);
        return router.back();
      });
  };

  return (
    <div>
      <nav className={styles.nav}>
        <Row className={styles.row}>
          <Col className={styles.logoCol} xs={6} md={3}>
            <h2>To-Do App</h2>
          </Col>
          <Col />
          <Col className={styles.linksCol} xs={5} md={4}>
            {count.nav === "logout" ? (
              <a onClick={logOut}>Logout</a>
            ) : count.nav === "signin" ? (
              <Link href="/signup">
                <a>Signup</a>
              </Link>
            ) : (
              <Link href="/">
                <a>Login</a>
              </Link>
            )}
          </Col>
        </Row>
      </nav>
    </div>
  );
};

export default Navbars;
