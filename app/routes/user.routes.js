const path = require("path");
const userController = require(path.join(
  __dirname,
  "../controllers/userController"
));

module.exports = (app) => {
  app.post("/api/register", userController.register);
  app.post("/api/login", userController.login);
};
