const path = require("path");
const userController = require(path.join(
  __dirname,
  "../controllers/userController"
));
const cors = require("cors");

module.exports = (app) => {
  app.post("/api/register", cors(), userController.register);
  app.post("/api/login", cors(), userController.login);
};
