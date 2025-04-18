const router = require("express").Router();
const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

// ruta para obtener todas las tarjetas
router.get("/", getAllCards);

//ruta para crear una tarjeta
router.post("/", createCard);

//ruta para eliminar una tarjeta
router.delete("/:id", deleteCard);

//ruta para dar like a una tarjeta
router.put("/:id/like", likeCard);

//ruta para dar dislike a una tarjeta
router.delete("/:id", dislikeCard);

module.exports = router;
