// Importamos el modelo 'Admin' que contiene el esquema y la funcionalidad para interactuar con la colección de administradores en la base de datos.
const Alerta = require("../models/alertas.model.js");

// Controlador para crear un nuevo administrador en la base de datos.
module.exports.createAlerta = (request, response) => {
  console.log(request.body); // Imprimimos en la consola el cuerpo de la solicitud recibida (datos del nuevo administrador).
  const {
    alertaDate,
    alertaHour,
    brigName,
    brigLastname,
    carPlate,
    alertaIncident,
    alertaDescription,
  } = request.body; // Extraemos el adminName, adminLastname, adminDNI, adminMail, adminPassword y adminPhone del cuerpo de la solicitud.
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(alertaDate)) {
    return response
      .status(400)
      .json({ message: 'El formato de la fecha debe ser "YYYY-MM-DD".' });
  }
  Alerta.create({
    alertaDate,
    alertaHour,
    brigName,
    brigLastname,
    carPlate,
    alertaIncident,
    alertaDescription,
  })
    .then((alerta) => response.json(alerta)) // Si se crea correctamente, devolvemos el nuevo administrador en formato JSON como respuesta.
    .catch((err) => response.status(400).json(err)); // Si ocurre un error, devolvemos el error en formato JSON con un código de estado 400 (solicitud incorrecta).
};

// Controlador para obtener todos los administradors de la base de datos, ordenados por edad de forma ascendente.
module.exports.getAllAlertas = (_, response) => {
  Alerta.find({})
    .sort({ alertaDate: 1, alertaHour: 1 }) // Ordenamos por 'adminName' y 'adminLastname' en orden alfabético ascendente (1).
    .then((alerta) => response.json(alerta)) // Devolvemos todos los administradores encontrados en formato JSON como respuesta.
    .catch((err) => response.json(err)); // Si ocurre un error, devolvemos el error en formato JSON.
};

// Controlador para obtener un administrador específico de la base de datos según su ID.
module.exports.getAlerta = (request, response) => {
  Alerta.findOne({ _id: request.params.id }) // Buscamos un administrador por su ID proporcionado en los parámetros de la URL.
    .then((alerta) => response.json(alerta)) // Devolvemos el administrador encontrado en formato JSON como respuesta.
    .catch((err) => response.json(err)); // Si ocurre un error, devolvemos el error en formato JSON.
};

// Controlador para eliminar un administrador de la base de datos según su ID.
module.exports.deleteAlerta = (request, response) => {
  Alerta.deleteOne({ _id: request.params.id }) // Buscamos y eliminamos el administrador por su ID proporcionado en los parámetros de la URL.
    .then((alerta) => response.json(alerta)) // Devolvemos el resultado de la eliminación en formato JSON como respuesta.
    .catch((err) => response.json(err)); // Si ocurre un error, devolvemos el error en formato JSON.
};

module.exports.updateAlerta = (request, response) => {
  Alerta.findOneAndUpdate({ _id: request.body._id }, request.body, {
    new: true,
  })
    .then((alerta) => response.json(alerta))
    .catch((err) => response.json(err));
};
