import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="Modal"></div>
          <div id="Alert"></div>
          <aside id="SideNav"></aside>
          <div id="Backdrop"></div>
          <div id="PageLoader"></div>
          <div id="Toast"></div>
          <div id="Captcha"></div>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
