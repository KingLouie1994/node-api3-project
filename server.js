const express = require("express");
const helmet = require("helmet");
const userRouter = require("./users/userRouter");

const User = require("./users/userDb");

const server = express();

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  // res.send(`<h2>Let's write some middleware!</h2>`);
  User.get()
    .then(users => {
      res.status(200).json(users);
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
