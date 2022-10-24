const resolve = require("path");
const blogController = require(resolve("../controllers/blogController"));

const verifyToken = require(resolve("../middlewares/jwt.auth"));

module.exports = (app) => {
  app.post("/api/blogs", verifyToken, blogController.create);
  app.get("/api/blogs", blogController.findAll);

  app.get("/api/blogs/:id", blogController.findOne);

  app.put("/api/blogs/:id", verifyToken, blogController.updateOne);

  app.delete("/api/blogs", verifyToken, blogController.deleteAll);

  app.delete("/api/blogs/:id", verifyToken, blogController.deleteOne);
};
