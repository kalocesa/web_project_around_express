const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const mongoose = require("mongoose");
const { assert } = require("console");

//Crear una variable, para guardar el objeto mongoose con el método Schema()
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^https?:\/\/(www\.)?[a-zA-Z0-9._~:/?%#\[\]@!$&'()*+,;=]+#?$/.test(
          v
        );
      },
      message: (props) => `${props.value} no es un avatar valido`,
    },
    required: [true, `El avatar del usuario es requerido`],
  },
});

//Guardamos el model/schema de user en la variable objeto User
const User = mongoose.model("user", userSchema);
//Instanciamos el objeto
const user = new User();
// Inicializamos la variable error con let, porque serían varios
let error;
// del objeto user buscamos la propiedad avatar y le asignamos un valor incorrecto
user.avatar = "htp:/ejemplo.com";
/**
 * El método validateSync sirve para la validación de documentos de forma síncrona
 * para verificar los datos de un modelo que cumplan con las caracteristicas definidas
 * en su esquema antes de realizar operaciones como guardarlas en su base de datos
 *
 */
error = user.validateSync();
// assert.equal compara los valores ingresados
assert.equal(
  error.errors["avatar"].message,
  `htp:/ejemplo.com no es una URL valida`
);

user.avatar = "";
error = user.validateSync();
assert.equal(error.errors["avatar"].message, `El avatar es requerido`);

user.avatar =
  "https://plus.unsplash.com/premium_photo-1738497320977-d718f647b6e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQyfHx8ZW58MHx8fHx8";
error = user.validateSync();
assert.equal(error, null);

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
module.exports = User;
