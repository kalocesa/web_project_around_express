const express = require("express");
const app = express();
const port = 3000;

// Importar rutas
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

// Utilizar rutas
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

// Manejar rutas no existentes
app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
