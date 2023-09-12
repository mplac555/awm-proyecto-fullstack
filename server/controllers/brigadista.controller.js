// Importamos el modelo 'Admin' que contiene el esquema y la funcionalidad para interactuar con la colección de administradores en la base de datos.
const Brigadista = require("../models/brigadista.model.js");

require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// Controlador para crear un nuevo administrador en la base de datos.
// module.exports.createBrigadista = (request, response) => {
//   console.log(request.body); // Imprimimos en la consola el cuerpo de la solicitud recibida (datos del nuevo administrador).
//   const {
//     brigName,
//     brigLastname,
//     brigDNI,
//     brigMail,
//     brigPassword,
//     brigPhone,
//     brigAddress,
//   } = request.body; // Extraemos el adminName, adminLastname, adminDNI, adminMail, adminPassword y adminPhone del cuerpo de la solicitud.
//   Brigadista.create({
//     brigName,
//     brigLastname,
//     brigDNI,
//     brigMail,
//     brigPassword,
//     brigPhone,
//     brigAddress,
//   })
//     .then((brigadista) => response.json(brigadista)) // Si se crea correctamente, devolvemos el nuevo administrador en formato JSON como respuesta.
//     .catch((err) => response.status(400).json(err)); // Si ocurre un error, devolvemos el error en formato JSON con un código de estado 400 (solicitud incorrecta).
// };

module.exports.createBrigadista = async (request, response) => {
  const {
    brigName,
    brigLastname,
    brigDNI,
    brigMail,
    brigPassword,
    brigPhone,
    brigAddress,
  } = request.body;

  if (
    !brigName ||
    !brigLastname ||
    !brigDNI ||
    !brigMail ||
    !brigPassword ||
    !brigPhone ||
    !brigAddress
  ) {
    response
      .status(400)
      .json({ message: "Missing fields, all are mandatory!" });
  } else {
    const userFound = await Brigadista.findOne({ brigName, brigMail });
    if (userFound) {
      response
        .status(400)
        .json({ message: "This brigade member already exists!" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(brigPassword, salt);
      Brigadista.create({
        brigName,
        brigLastname,
        brigDNI,
        brigMail,
        brigPassword: hashedPassword,
        brigPhone,
        brigAddress,
      })
        .then((brig) =>
          response.json({
            _id: brig._id,
            brigName: brig.brigName,
            brigLastname: brig.brigLastname,
            brigDNI: brig.brigDNI,
            brigMail: brig.brigMail,
            brigPhone: brig.brigPhone,
            brigAddress: brig.brigAddress,
            token: generateToken(brig._id),
          })
        )
        .catch((err) => response.status(400).json(err));
    }
  }
};

module.exports.loginBrigadista = async (req, res) => {
  const { brigName, brigMail, brigPassword } = req.body;
  const userFound = await Brigadista.findOne({ brigName, brigMail });
  if (
    userFound &&
    (await bcrypt.compare(brigPassword, userFound.brigPassword))
  ) {
    res.json({
      message: "Login Succeeded",
      _id: userFound._id,
      brigName: userFound.brigName,
      brigLastname: userFound.brigLastname,
      brigDNI: userFound.brigDNI,
      brigMail: userFound.brigMail,
      brigPhone: userFound.brigPhone,
      brigAddress: userFound.brigAddress,
      token: generateToken(userFound._id),
    });
  } else {
    res.status(400).json({ message: "Login Failed" });
  }
};

// Controlador para obtener todos los administradors de la base de datos, ordenados por edad de forma ascendente.
module.exports.getAllBrigadistas = (_, response) => {
  Brigadista.find({})
    .sort({ brigName: 1, brigLastname: 1 }) // Ordenamos por 'adminName' y 'adminLastname' en orden alfabético ascendente (1).
    .then((brigadista) => response.json(brigadista)) // Devolvemos todos los administradores encontrados en formato JSON como respuesta.
    .catch((err) => response.json(err)); // Si ocurre un error, devolvemos el error en formato JSON.
};

// Controlador para obtener un administrador específico de la base de datos según su ID.
module.exports.getBrigadista = (request, response) => {
  Brigadista.findOne({ _id: request.params.id }) // Buscamos un administrador por su ID proporcionado en los parámetros de la URL.
    .then((brigadista) => response.json(brigadista)) // Devolvemos el administrador encontrado en formato JSON como respuesta.
    .catch((err) => response.json(err)); // Si ocurre un error, devolvemos el error en formato JSON.
};

// Controlador para eliminar un administrador de la base de datos según su ID.
module.exports.deleteBrigadista = (request, response) => {
  Brigadista.deleteOne({ _id: request.params.id }) // Buscamos y eliminamos el administrador por su ID proporcionado en los parámetros de la URL.
    .then((brigadista) => response.json(brigadista)) // Devolvemos el resultado de la eliminación en formato JSON como respuesta.
    .catch((err) => response.json(err)); // Si ocurre un error, devolvemos el error en formato JSON.
};

module.exports.updateBrigadista = (request, response) => {
  Brigadista.findOneAndUpdate({ _id: request.body._id }, request.body, {
    new: true,
  })
    .then((brigadista) => response.json(brigadista))
    .catch((err) => response.json(err));
};

//Controlador para obtener un brigadista en base a su nombre y correo
module.exports.getBrigadistaProfile = (request, response) => {
  const brigName = request.params.name;
  const brigMail = request.params.email;
  Brigadista.findOne({ brigName: brigName, brigMail: brigMail })
    .then((brigadista) => response.json(brigadista)) // Devolvemos el administrador encontrado en formato JSON como respuesta.
    .catch((err) => response.json(err)); // Si ocurre un error, devolvemos el error en formato JSON.
};
