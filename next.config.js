const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const envValues = require("./envValues");

module.exports = (phase) => {
  console.log("NODE_ENV PROD", process.env.NODE_ENV);
  console.log("env values ========>>>>>>> ", envValues?.EMAIL_SERVICE);
  return {
    env: envValues,
    images: {
      domains: ["res.cloudinary.com"],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    reactStrictMode: true,
  };
};
