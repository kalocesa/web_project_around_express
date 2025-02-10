const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const path = require("path");

// Leer los archivos JSON
const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "users.json"), "utf-8")
);
const cards = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "cards.json"), "utf-8")
);

// Ruta para obtener todos los usuarios
app.get("/users", (req, res) => {
  res.json(users);
});

// Ruta para obtener todas las tarjetas
app.get("/cards", (req, res) => {
  res.json(cards);
});

// Ruta para obtener un usuario por ID
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u._id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "ID de usuario no encontrado" });
  }
});

// Manejar rutas no existentes
app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
