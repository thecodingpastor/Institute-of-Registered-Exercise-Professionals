const fetchGoogleScore = async (gReCaptchaToken: string) => {
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `secret=${process.env.GOOGLE_CAPTCHA_SECRET_KEY}&response=${gReCaptchaToken}`,
  });

  const reCaptchaRes = await res.json();
  return reCaptchaRes?.score > 0.5;
};

export default fetchGoogleScore;
