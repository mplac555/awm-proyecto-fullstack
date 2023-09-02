// Importamos el módulo 'express' que nos permite crear y gestionar servidores web.
const express = require('express');

// Importamos el módulo 'cors' que nos ayuda a habilitar el intercambio de recursos de origen cruzado (Cross-Origin Resource Sharing).
const cors = require('cors');

// Creamos una instancia de la aplicación Express.
const app = express();

// Definimos el número de puerto en el que se ejecutará nuestro servidor.
const port = 8000;

// Importamos la configuración de Mongoose, que se encargará de conectarse a la base de datos.
require('./server/config/mongoose.config');

// Habilitamos el uso de CORS en nuestra aplicación, lo que permitirá que otros dominios accedan a nuestra API.
app.use(cors());

// Habilitamos el middleware de Express para analizar los datos enviados en formato JSON en las solicitudes.
app.use(express.json());

// Habilitamos el middleware de Express para analizar los datos enviados desde formularios HTML (url-encoded).
app.use(express.urlencoded({ extended: true }));

// Importamos las rutas definidas para los administradores, brigadistas y propietarios, y las vinculamos a nuestra aplicación Express.
const allAdminRoutes = require('./server/routes/admin.routes');
allAdminRoutes(app);

const allBrigadistaRoutes = require('./server/routes/brigadista.routes');
allBrigadistaRoutes(app);

const allAlertasRoutes = require('./server/routes/alertas.routes');
allAlertasRoutes(app);

const allPropietarioRoutes = require('./server/routes/propietario.routes');
allPropietarioRoutes(app);

// Ponemos el servidor a la escucha en el puerto especificado.
app.listen(port, () => {
    console.log("Server listening at port", port);
});