// Importamos el módulo 'mongoose', que nos permite trabajar con MongoDB y definir esquemas y modelos para nuestros datos.
const mongoose = require('mongoose');

// Definimos un esquema para la colección de Brigadista en la base de datos.
const BrigSchema = new mongoose.Schema({
    brigName: {
        type: String,
        required: [true, "El nombre del Brigadista es requerido"],
        validate: {
            validator: function (value) {
                // Validamos que el nombre tenga entre 4 y 10 caracteres.
                return value.length >= 4 && value.length <= 10;
            },
            message: 'El nombre del Brigadista debe tener entre cuatro y diez caracteres.'
        }
    },
    brigLastname: {
        type: String,
        required: [true, "El apellido del Brigadista es requerido"],
        validate: {
            validator: function (value) {
                // Validamos que el apellido tenga entre 4 y 10 caracteres.
                return value.length >= 4 && value.length <= 10;
            },
            message: 'El apellido del Brigadista debe tener entre cuatro y diez caracteres.'
        }
    },
    brigDNI: {
        type: Number,
        required: [true, "El DNI del Brigadista es requerido"],
        unique: true,
        validate: {
            validator: function (value) {
                // Validamos que el DNI tenga exactamente 10 dígitos.
                return value.toString().length === 10;
            },
            message: 'El DNI del Brigadista debe tener diez números.'
        }
    },
    brigMail: {
        type: String,
        required: [true, "El correo del Brigadista es requerido"],
        unique: true,
        validate: {
            validator: function (value) {
                // Validamos el formato de correo electrónico usando una expresión regular.
                const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
                return emailRegex.test(value);
            },
            message: 'El correo del Brigadista no es válido.'
        }
    },
    brigPassword: {
        type: String,
        required: [true, "La contraseña del Brigadista es requerida"],
        minlength: [6, "La contraseña debe tener al menos 6 caracteres"]
    },
    brigPhone: {
        type: Number,
        required: [true, "El número de teléfono del Brigadista es requerido"],
        unique: true,
        validate: {
            validator: function (value) {
                // Validamos que el número de teléfono tenga exactamente 10 dígitos.
                return value.toString().length === 10;
            },
            message: 'El número de teléfono del Brigadista debe tener diez números.'
        }
    },
    brigAddress: {
        type: String,
        required: [true, "La dirección del Brigadista es requerido"],
        validate: {
            validator: function (value) {
                // Validamos que la dirección tenga al menos 10 caracteres.
                return value.length >= 10;
            },
            message: 'La dirección del Brigadista debe tener al menos diez caracteres.'
        }
    }
});

// Creamos un índice único para DNI, teléfono y correo.
BrigSchema.index({ brigDNI: 1, brigPhone: 1, brigMail: 1 }, { unique: true });

// Creamos un modelo 'Brigadista' a partir del esquema definido, que nos permitirá interactuar con la colección de Brigadista en la base de datos.
const Brigadista = mongoose.model('Brigadista', BrigSchema);

// Exportamos el modelo 'Brigadista' para poder utilizarlo en otras partes de la aplicación.
module.exports = Brigadista;
