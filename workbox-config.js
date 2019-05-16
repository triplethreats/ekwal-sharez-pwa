const path = require("path");

module.exports = {
    "globDirectory": "dist/",
    "globPatterns": [
        "**/*.{ico,png,html,webmanifest,js,css}"
    ],
    /*runtimeCaching: [{
      urlPattern: "/api/",
      handler: "NetworkFirst",
      options: {
        networkTimeoutSeconds: 10,
        cacheName: "apiCache",
        backgroundSync: {
          name: "apiQueue",
          options: {}
        },
        cacheableResponse: {
          statuses: [0, 200]
        }
      }
    }],*/
    "swDest": path.join("dist", "sw.js"),
    "swSrc": path.join("public", "sw.js")
};
