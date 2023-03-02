const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  return {
    env: {
      APP_URL:
        phase === PHASE_DEVELOPMENT_SERVER
          ? "http://localhost:4000/api/v1"
          : "https://institute-of-registered-exercise-professionals.vercel.app/",
    },
    images: {
      domains: ["res.cloudinary.com"],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    reactStrictMode: true,
  };
};
