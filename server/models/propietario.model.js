// Importamos el módulo 'mongoose', que nos permite trabajar con MongoDB y definir esquemas y modelos para nuestros datos.
const mongoose = require('mongoose');
const Car = require('./auto.model');

// Definimos un esquema para la colección de Propietario en la base de datos.
const PropietarioSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: [true, "El nombre del Propietario es requerido"],
        validate: {
            validator: function (value) {
                // Validamos que el nombre tenga entre 4 y 10 caracteres.
                return value.length >= 4 && value.length <= 10;
            },
            message: 'El nombre del Propietario debe tener entre cuatro y diez caracteres.'
        }
    },
    ownerLastname: {
        type: String,
        required: [true, "El apellido del Propietario es requerido"],
        validate: {
            validator: function (value) {
                // Validamos que el apellido tenga entre 4 y 10 caracteres.
                return value.length >= 4 && value.length <= 10;
            },
            message: 'El apellido del Propietario debe tener entre cuatro y diez caracteres.'
        }
    },
    ownerDNI: {
        type: Number,
        required: [true, "El DNI del Propietario es requerido"],
        unique: true,
        validate: {
            validator: function (value) {
                // Validamos que el DNI tenga exactamente 10 dígitos.
                return value.toString().length === 10;
            },
            message: 'El DNI del Propietario debe tener diez números.'
        }
    },
    ownerPhone: {
        type: Number,
        required: [true, "El número de teléfono del Propietario es requerido"],
        unique: true,
        validate: {
            validator: function (value) {
                // Validamos que el número de teléfono tenga exactamente 10 dígitos.
                return value.toString().length === 10;
            },
            message: 'El número de teléfono del Propietario debe tener diez números.'
        }
    },
    ownerCars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car' // Debes usar el nombre con el que definiste el modelo de Car (en este caso, 'Car')
    }]
});

// Creamos un índice único para DNI, teléfono y correo.
PropietarioSchema.index({ ownerDNI: 1, ownerPhone: 1 }, { unique: true });

// Creamos un modelo 'Propietario' a partir del esquema definido, que nos permitirá interactuar con la colección de Propietario en la base de datos.
const Propietario = mongoose.model('Propietario', PropietarioSchema);

// Exportamos el modelo 'Propietario' para poder utilizarlo en otras partes de la aplicación.
module.exports = Propietario;
