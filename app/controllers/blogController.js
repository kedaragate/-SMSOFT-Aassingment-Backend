const resolve = require("path");

const blog = require(resolve("../models/blogModel"));

exports.create = (req, res) => {
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
};

exports.findAll = (req, res) => {
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
};

exports.findOne = (req, res) => {
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
};

exports.deleteAll = (req, res) => {
  blog
    .deleteMany({})
    .then((data) => {
      if (!data) {
        res.status(400).send({ message: "Something went wrong." });
      }
      res.json({
        message: "Deleted all the blogs",
      });
    })
    .catch((err) => res.status(500).send({ message: err }));
};

exports.deleteOne = (req, res) => {
  id = req.params.id;

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    blog.findByIdAndDelete(id).then((data) => {
      if (!data) {
        res.status(400).send({ message: "Something went wrong." });
      } else {
        res.send({ message: `Successfully deleted blog ${req.params.id}` });
      }
    });
  } else {
    res.status(400).send({ message: "Please enter correct id" });
  }
};

exports.updateOne = (req, res) => {
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
};
