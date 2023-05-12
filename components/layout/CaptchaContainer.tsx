import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const CaptchaContainer = ({ children }) => {
  return (
    <GoogleReCaptchaProvider
      // reCaptchaKey="6LeRI9ckAAAAACRBtZYCWDmlvXofaAnmYypkAgYM"
      reCaptchaKey="6LfbfwQmAAAAALZRVekmUeoDO28eVY1JRnZX9nrU"
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
};

export default CaptchaContainer;
