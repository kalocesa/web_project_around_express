const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const mongoose = require("mongoose");
const assert = require("assert");
const { route } = require("./cards");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener a los usuarios", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "ID del usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener al usuario", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = new User({ name, about, avatar });
    const saveNewUser = await newUser.save();
    res.status(201).json(saveNewUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.deleteOne();
    if (user.deletedCount === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener al usuario", error });
  }
});

module.exports = router;
