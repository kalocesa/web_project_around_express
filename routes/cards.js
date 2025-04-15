const express = require("express");
const fs = require("fs");
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

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, "El nombre de la tarjeta es requerido"],
  },
  link: {
    type: String,
    validate: {
      validator: function (v) {
        return /^https?:\/\/(www\.)?[a-zA-Z0-9._~:/?%#\[\]@!$&'()*+,;=]+#?$/.test(
          v
        );
      },
      message: (props) => `${props.value} no es un URL valido`,
    },
    required: [true, "El link de la tarjeta es requerido"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "El autor de la tarjeta es requerido"],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model("card", cardSchema);
const card = new Card();
let error;
//El link es incorrecto
card.link = "htp:/ejemplo.com";
error = card.validateSync();
assert.equal(
  error.errors["link"].message,
  `htp:/ejemplo.com de la tarjeta no es un URL valido`
);
//No hay link en el campo
card.link = "";
error = card.validateSync();
assert.equal(error.errors["link"].message, `El URL del link es requerido`);
//Cuando el link es valido
card.link =
  "https://images.unsplash.com/photo-1665064563439-7d836bf18fb4?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29haHVpbGF8ZW58MHx8MHx8fDA%3D";
error = card.validateSync();
assert.equal(error, null);

module.exports = { Card, router };
