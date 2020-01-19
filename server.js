const express = require("express");
const helmet = require("helmet");
const userRouter = require("./users/userRouter");

const User = require("./users/userDb");

const server = express();

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  const message = `Here you see a list of all our users`;
  User.get()
    .then(users => {
      res.status(200).json({
        message: message,
        users
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "There is an error retreiving the users"
      });
    });
});

server.use("/api/users", logger, userRouter);

function logger(req, res, next) {
  const { method, url } = req;
  console.log({
    method,
    url,
    timeStamp: Date.now()
  });
  next();
}

module.exports = server;
