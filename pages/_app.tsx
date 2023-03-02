import Head from "next/head";
import type { AppProps } from "next/app";

// Global styles
import "../styles/global.scss";

import Layout from "../components/layout/Layout";
import RouteLoading from "../components/loaders/RouteLoading";

// Store
import { store } from "../fetchConfig/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Head>
        <title>IREP | Institute of Registered Exercise Professionals</title>
        <meta
          name="description"
          content="Institute of Registered Exercise Professionals"
        />
        <meta
          name="description"
          content="The first of its kind, this Institute was established with the help of Internationally recognized Fitness & Health Professionals to Train & Certify Exercise Professionals as well as accredit Gym facilities in Nigeria. It is Europe Active Accredited."
        />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <RouteLoading />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
