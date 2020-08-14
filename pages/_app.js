import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbars from "../components/Navbars";
import Context from "../lib/Context";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Context>
        <Navbars />
        <Component {...pageProps} />
      </Context>
    </>
  );
}

export default MyApp;
