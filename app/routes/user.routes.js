const resolve = require("path");
const userController = require(resolve("../controllers/userController"));

module.exports = (app) => {
  app.post("/api/register", userController.register);
  app.post("/api/login", userController.login);
};
