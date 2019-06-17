const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/auth/spotify", { target: "http://localhost:4000" }));
  app.use(proxy("/auth/logout", { target: "http://localhost:4000" }));
};
