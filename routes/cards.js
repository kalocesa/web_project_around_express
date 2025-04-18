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

// Obtener todas las tarjetas
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tarjetas", error });
  }
});

// Crear una tarjeta
router.post("/", async (req, res) => {
  try {
    const { name, link, owner } = req.body;
    if (!name || !link || !owner) {
      return res.status(400).json({
        message: "La solicitud no se puede procesar porque faltan elementos",
      });
    }
    const newCard = new Card({ name, link, owner });
    const newCardSave = await newCard.save();
    res.status(201).json(newCardSave);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la tarjeta", error: error.message });
  }
});

// Eliminar una tarjeta
router.delete("/:id", async (req, res) => {
  try {
    const card = await Card.deleteOne({ _id: req.params.id });
    if (card.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Error al encontrar la tarjeta", error });
    }
    res.status(200).json({ message: "Tarjeta eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la tarjeta", error });
  }
});

module.exports = Card;
module.exports = router;
