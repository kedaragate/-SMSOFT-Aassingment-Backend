const path = require("path");
const userController = require(path.join(
  __dirname,
  "../controllers/userController"
));

module.exports = (app, cors) => {
  app.post("/api/register", cors(), userController.register);
  app.post("/api/login", cors(), userController.login);
};
