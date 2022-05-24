import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
// Global Styles
import "../styles/global.css";
// Loader Styles
import "../styles/loader.scss";

// Swiper Styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";

import Layout from "../components/layout";
import { ToastContainer } from "react-toastify";
import { AuthContext, AuthProvider } from "../store/auth";
import { useContext, useEffect, useState } from "react";
import Loader from "../util/loader";
import Router from "next/router";
import axios from "axios"

// Axios Config :
axios.defaults.baseURL = "http://localhost:3005"

function MyApp({ Component, pageProps }) {
  const [loaderStatus, setLoaderStatus] = useState(true);
  const [isFirst, setIsFirst] = useState(true);

  Router.onRouteChangeStart = () => {
    console.log("onRouteChangeStart");
    setLoaderStatus(true);
    setIsFirst(false);
  };

  Router.onRouteChangeComplete = () => {
    console.log("onRouteChangeComplete");
    setLoaderStatus(false);
    setIsFirst(false);
  };

  Router.onRouteChangeError = () => {};

  return (
    <AuthProvider>
      <ToastContainer rtl />
      {loaderStatus ? (
        <Loader
          setLoader={(bool) => {
            setLoaderStatus(bool);
            setIsFirst(bool);
          }}
          isFirst={isFirst}
        />
      ) : (
        <Layout customize={pageProps.customize}>
          <Component {...pageProps} />
        </Layout>
      )}
    </AuthProvider>
  );
}

export default MyApp;
