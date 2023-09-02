// Importamos el modelo 'Admin' que contiene el esquema y la funcionalidad para interactuar con la colección de administradores en la base de datos.
const Admin = require('../models/admin.model.js');

// Controlador para crear un nuevo administrador en la base de datos.
module.exports.createAdmin = (request, response) => {
    console.log(request.body); // Imprimimos en la consola el cuerpo de la solicitud recibida (datos del nuevo administrador).
    const { adminName, adminLastname, adminDNI, adminMail, adminPassword, adminPhone } = request.body; // Extraemos el adminName, adminLastname, adminDNI, adminMail, adminPassword y adminPhone del cuerpo de la solicitud.
    Admin.create({
        adminName,
        adminLastname,
        adminDNI,
        adminMail,
        adminPassword,
        adminPhone
    })
    .then(user => response.json(user)) // Si se crea correctamente, devolvemos el nuevo administrador en formato JSON como respuesta.
    .catch(err => response.status(400).json(err)); // Si ocurre un error, devolvemos el error en formato JSON con un código de estado 400 (solicitud incorrecta).
}

// Controlador para obtener todos los administradors de la base de datos, ordenados por edad de forma ascendente.
module.exports.getAllAdmins = (_, response) => {
    Admin.find({}).sort({ adminName: 1, adminLastname: 1 }) // Ordenamos por 'adminName' y 'adminLastname' en orden alfabético ascendente (1).
    .then(authors => response.json(authors)) // Devolvemos todos los administradores encontrados en formato JSON como respuesta.
    .catch(err => response.json(err)); // Si ocurre un error, devolvemos el error en formato JSON.
}

// Controlador para obtener un administrador específico de la base de datos según su ID.
module.exports.getAdmin = (request, response) => {
    Admin.findOne({ _id: request.params.id }) // Buscamos un administrador por su ID proporcionado en los parámetros de la URL.
    .then(user => response.json(user)) // Devolvemos el administrador encontrado en formato JSON como respuesta.
    .catch(err => response.json(err)); // Si ocurre un error, devolvemos el error en formato JSON.
}

// Controlador para eliminar un administrador de la base de datos según su ID.
module.exports.deleteAdmin = (request, response) => {
    Admin.deleteOne({ _id: request.params.id }) // Buscamos y eliminamos el administrador por su ID proporcionado en los parámetros de la URL.
    .then(userDeleted => response.json(userDeleted)) // Devolvemos el resultado de la eliminación en formato JSON como respuesta.
    .catch(err => response.json(err)); // Si ocurre un error, devolvemos el error en formato JSON.
}