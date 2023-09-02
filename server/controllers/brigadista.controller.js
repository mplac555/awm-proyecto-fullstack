// Importamos el modelo 'Admin' que contiene el esquema y la funcionalidad para interactuar con la colección de administradores en la base de datos.
const Brigadista = require('../models/brigadista.model.js');

// Controlador para crear un nuevo administrador en la base de datos.
module.exports.createBrigadista = (request, response) => {
    console.log(request.body); // Imprimimos en la consola el cuerpo de la solicitud recibida (datos del nuevo administrador).
    const { brigName, brigLastname, brigDNI, brigMail, brigPassword, brigPhone, brigAddress } = request.body; // Extraemos el adminName, adminLastname, adminDNI, adminMail, adminPassword y adminPhone del cuerpo de la solicitud.
    Brigadista.create({
        brigName,
        brigLastname,
        brigDNI,
        brigMail,
        brigPassword,
        brigPhone,
        brigAddress
    })
    .then(brigadista => response.json(brigadista)) // Si se crea correctamente, devolvemos el nuevo administrador en formato JSON como respuesta.
    .catch(err => response.status(400).json(err)); // Si ocurre un error, devolvemos el error en formato JSON con un código de estado 400 (solicitud incorrecta).
}

// Controlador para obtener todos los administradors de la base de datos, ordenados por edad de forma ascendente.
module.exports.getAllBrigadistas = (_, response) => {
    Brigadista.find({}).sort({ brigName: 1, brigLastname: 1 }) // Ordenamos por 'adminName' y 'adminLastname' en orden alfabético ascendente (1).
    .then(brigadista => response.json(brigadista)) // Devolvemos todos los administradores encontrados en formato JSON como respuesta.
    .catch(err => response.json(err)); // Si ocurre un error, devolvemos el error en formato JSON.
}

// Controlador para obtener un administrador específico de la base de datos según su ID.
module.exports.getBrigadista = (request, response) => {
    Brigadista.findOne({ _id: request.params.id }) // Buscamos un administrador por su ID proporcionado en los parámetros de la URL.
    .then(brigadista => response.json(brigadista)) // Devolvemos el administrador encontrado en formato JSON como respuesta.
    .catch(err => response.json(err)); // Si ocurre un error, devolvemos el error en formato JSON.
}

// Controlador para eliminar un administrador de la base de datos según su ID.
module.exports.deleteBrigadista = (request, response) => {
    Brigadista.deleteOne({ _id: request.params.id }) // Buscamos y eliminamos el administrador por su ID proporcionado en los parámetros de la URL.
    .then(brigadista => response.json(brigadista)) // Devolvemos el resultado de la eliminación en formato JSON como respuesta.
    .catch(err => response.json(err)); // Si ocurre un error, devolvemos el error en formato JSON.
}