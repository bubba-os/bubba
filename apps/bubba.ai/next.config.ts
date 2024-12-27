import "./src/env.mjs";

const config = {
  experimental: {
    ppr: "incremental",
    dynamicIO: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default config;
