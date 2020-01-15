const express = require("express");
const {
  get,
  getById,
  getUserPosts,
  insert,
  update,
  remove
} = require("./userDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  insert(req.body)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(error => {
      res.status(500).json({
        message: "There is an error creating the new user"
      });
    });
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({
        message: "There is an error retreiving the users"
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.json(req.user);
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: "User id does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "There is an error"
      });
    });
}

function validateUser(req, res, next) {
  if (Object.keys(req.body).length && req.body.name) {
    next();
  } else if (Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: "missing user data"
    });
  } else {
    res.status(400).json({
      message: "missing required name field"
    });
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
