// Importamos el módulo 'mongoose', que nos permite conectarnos y comunicarnos con la base de datos MongoDB.
const mongoose = require("mongoose");

const localURL = "mongodb://127.0.0.1:27017/Proyecto2_DB";
const atlasURL =
  "mongodb+srv://marceloplacencia:contraseñaAWM@cluster0.uzesisb.mongodb.net/Proyecto2_DB?retryWrites=true&w=majority";

// Establecemos una conexión con la base de datos MongoDB local ubicada en "mongodb://127.0.0.1:27017/Proyecto2_DB".
mongoose
  .connect(atlasURL, {
    useNewUrlParser: true, // Habilitamos el nuevo analizador de URL de MongoDB (necesario debido a cambios en las versiones recientes).
    useUnifiedTopology: true, // Habilitamos el nuevo motor de detección y supervisión de servidores (necesario debido a cambios en las versiones recientes).
  })

  // Si la conexión es exitosa, se ejecutará el bloque 'then'.
  .then(() => console.log(`Established a connection to the database`))

  // Si ocurre algún error durante la conexión, se ejecutará el bloque 'catch'.
  .catch((err) =>
    console.log("Something went wrong when connecting to the database", err)
  );
