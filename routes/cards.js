const express = require("express");
const path = require("path");
const router = express.Router();
const mongoose = require("mongoose");
const { assert } = require("console");

const cards = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/cards.json"), "utf-8")
);

router.get("/", (req, res) => {
  res.json(cards);
});

module.exports = Card;
module.exports = router;
