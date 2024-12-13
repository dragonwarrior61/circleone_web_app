const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/auth",
    createProxyMiddleware({
      target: "https://circlone-backend.azurewebsites.net",
      changeOrigin: true,
      pathRewrite: { "^/auth": "" },
    }),
  );
};