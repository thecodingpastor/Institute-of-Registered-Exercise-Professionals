import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const CaptchaContainer = ({ children }) => {
  return (
    <GoogleReCaptchaProvider
      // reCaptchaKey="6LcaeG0kAAAAAFLBkyBi2t5mpSIOm3Jg9flf4hB4"
      reCaptchaKey="6LdVys8kAAAAALP8mnIyl-NgSps9D4_hZTeljFoJ"
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
