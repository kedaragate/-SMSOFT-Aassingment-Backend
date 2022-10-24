const resolve = require("path");

const userModel = require(resolve("../models/userModel"));
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.register = (req, res) => {
  const { firstName, lastName, emailId, role, password } = req.body;

  const newUser = new userModel({
    firstName,
    lastName,
    emailId,
    role,
    password: bcrypt.hashSync(password, 10),
  });

  newUser
    .save()
    .then((data) => {
      res
        .status(200)
        .send({ message: `Registration successful with ${data.emailId}` });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.login = (req, res) => {
  const { emailId, password } = req.body;

  userModel
    .findOne({ emailId })
    .then((data) => {
      if (!data) {
        res.status(404).send(`no user found with ${emailId}`);
      }
      let isPasswordValid = bcrypt.compareSync(password, data.password);

      if (!isPasswordValid) {
        res.status(401).send({ message: "Incorrect password" });
      } else {
        const token = jwt.sign(data.id, process.env.SECRET_KEY);
        return res.send({
          user: {
            id: data.id,
            email: data.emailId,
            firstName: data.firstName,
            lastName: data.lastName,
          },
          accessToken: token,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
