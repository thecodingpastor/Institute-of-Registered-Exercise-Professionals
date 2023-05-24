import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const CaptchaContainer = ({ children }) => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey="6LcR1bAlAAAAAIsXhV-YNt1O9SvX0pDbmYr-v_XB"
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
