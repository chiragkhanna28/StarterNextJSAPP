/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        mongodb_username: "sa",
        mongodb_password: "234qwe234qwe",
        mongodb_clustername: "cluster0",
        mongodb_dbname: "events-dev",
      },
    };
  }
  return {
    reactStrictMode: true,
    env: {
      mongodb_username: "sa",
      mongodb_password: "234qwe234qwe",
      mongodb_clustername: "cluster0",
      mongodb_dbname: "events",
    },
  };
};
