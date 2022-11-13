const path = require("path");
const bookMarkModel = require(path.join(__dirname, "../models/bookMarkModel"));

exports.create = (req, res) => {
  const { title, link, tags } = req.body;

  const newBookMark = new bookMarkModel({ title, link, tags });

  newBookMark

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
  bookMarkModel
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
    bookMarkModel
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

exports.deleteOne = (req, res) => {
  id = req.params.id;

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    bookMarkModel.findByIdAndDelete(id).then((data) => {
      if (!data) {
        res.status(400).send({ message: "Something went wrong." });
      } else {
        res.send({ message: `Successfully deleted bookmark ${req.params.id}` });
      }
    });
  } else {
    res.status(400).send({ message: "Please enter correct id" });
  }
};

exports.updateOne = (req, res) => {
  let id = req.params.id;
  const { title, link, tags } = req.body;

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    bookMarkModel
      .findOneAndUpdate({ _id: id }, { title, link, tags }, { new: true })
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
