/**
 * @type {import('next').NextConfig}
 */

module.exports = {
  //6
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};
