const express = require("express");
const helmet = require("helmet");
const userRouter = require("./users/userRouter");

const server = express();

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use("/api/users", userRouter);

function logger(req, res, next) {}

module.exports = server;
