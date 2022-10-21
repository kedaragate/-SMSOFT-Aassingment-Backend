const express = require("express");
const bodyParser = require("body-parser");
const random = require("random");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI);
// 'mongodb://localhost:27017/test'
// use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled

let db = mongoose.connection;

db.on("error", () => {
  console.log("error in db connection");
});
db.once("open", () => {
  console.log("db connection successful");
});

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now() },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});

const blog = mongoose.model("blog", blogSchema);

app.post("/api/blogs", (req, res) => {
  const { title, author, body } = req.body;

  const comments = [];

  const newBlog = new blog({ title, author, body, comments });

  newBlog
    .save()
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "Something went wrong" });
      } else {
        res.json(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/api/blogs", (req, res) => {
  blog
    .find({})
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "Something went wrong" });
      } else {
        res.json(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/api/blogs/:id", (req, res) => {
  let id = req.params.id;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    // Yes, it's a valid ObjectId, proceed with `findById` call.
    blog
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(400).send({ message: "Something went wrong" });
        } else {
          res.json(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.status(400).send({ message: "Please enter correct id" });
  }
});

app.put("/api/blogs/:id", (req, res) => {
  let id = req.params.id;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    blog
      .findByIdAndUpdate(id)
      .then((data) => {
        if (!data) {
          res.status(400).send({ message: "Something went wrong" });
        } else {
          let keysToUpdate = Object.keys(req.body);

          keysToUpdate.forEach((key) => (data[key] = req.body[key]));
          res.json(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.status(400).send({ message: "Please enter correct id" });
  }
});

app.delete("/api/blogs", (req, res) => {
  blog
    .deleteMany({})
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "Something went wrong." });
      }
      res.json({
        message: `Successfully deleted ${data.deletedCount} ${
          deletedCount > 1 ? "blogs" : "blog"
        }.`,
      });
    })
    .catch((err) => res.status(500).send({ message: err }));
});

app.delete("/api/blogs/:id", (req, res) => {
  id = req.params.id;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    blog.findByIdAndDelete(id).then((data) => {
      if (!data) {
        res.status(400).send({ message: "Something went wrong." });
      } else {
        res.send({ message: `Successfully deleted blog ${req.body.title}` });
      }
    });
  } else {
    res.status(400).send({ message: "Please enter correct id" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
