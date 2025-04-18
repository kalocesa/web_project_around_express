const User = require("../models/user");

//Obtener todos los usuarios
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener a los usuarios", error });
  }
};

//Obtener un usuario por ID
module.exports.getUserById = async (req, res) => {
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
};

//Crear un nuevo usuario
module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = new User({ name, about, avatar });
    const saveNewUser = await newUser.save();
    res.status(201).json(saveNewUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un usuario por su ID
module.exports.deleteUser = async (req, res) => {
  try {
    const user = await User.deleteOne();
    if (user.deletedCount === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener al usuario", error });
  }
};
