const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/users.json"), "utf-8")
);

router.get("/", (req, res) => {
  res.json(users);
});

router.get("/:id", (req, res) => {
  const user = users.find((user) => user._id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "ID de usuario no encontrado" });
  }
});

module.exports = router;
