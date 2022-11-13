const path = require("path");
const bookMarkController = path.join(
  __dirname + "../controllers/bookMarkController.js"
);

module.exports = (app) => {
  app.post("/api/bookmarks", bookMarkController.create);
  app.get("/api/bookmarks", bookMarkController.findAll);

  app.get("/api/bookmarks/:id", bookMarkController.findOne);

  app.put("/api/bookmarks/:id", bookMarkController.updateOne);

  app.delete("/api/bookmarks/:id", bookMarkController.deleteOne);
};
