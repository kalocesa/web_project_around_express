const router = express.Router();
const { getAllCards, createCard, deleteCard } = require("../controllers/cards");

// ruta para obtener todas las cartas
router.get("/", getAllCards);

//ruta para crear una carta
router.post("/", createCard);

//ruta para eliminar una carta
router.delete("/:id", deleteCard);

module.exports = router;
