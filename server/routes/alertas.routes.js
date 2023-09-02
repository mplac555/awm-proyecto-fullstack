// Importamos el controlador 'AdminController' que contiene las funciones para manejar las operaciones relacionadas con los administradores.
const AlertaController = require('../controllers/alerta.controller');

// Exportamos una función que define las rutas de la API para interactuar con los administradores en la aplicación.
module.exports = function(app) {
    // Definimos una ruta POST '/api/admin/new' para crear un nuevo administrador.
    app.post('/api/alerta/new', AlertaController.createAlerta);

    // Definimos una ruta GET '/api/admins' para obtener todos los administradores.
    app.get('/api/alertas', AlertaController.getAllAlertas);

    // Definimos una ruta GET '/api/admin/:id' para obtener un administrador específico por su ID.
    app.get('/api/alerta/:id', AlertaController.getAlerta);

    // Definimos una ruta PUT '/api/admin/:id' para actualizar un administrador específico por su ID.
    //app.put('/api/admin/:id/', AdminController.updateadmin);

    // Definimos una ruta DELETE '/api/admin/:id' para eliminar un administrador específico por su ID.
    app.delete('/api/alerta/:id', AlertaController.deleteAlerta);
}