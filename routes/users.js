const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
} = require("../controllers/users");

//ruta de todos los usuarios
router.get("/", getAllUsers);

//ruta de usuario por id
router.get("/:id", getUserById);

//ruta para crear un nuevo usuario
router.post("/", createUser);

//ruta para eliminar un usuario
router.delete("/:id", deleteUser);

module.exports = router;
