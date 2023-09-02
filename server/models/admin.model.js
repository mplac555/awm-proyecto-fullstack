// Importamos el módulo 'mongoose', que nos permite trabajar con MongoDB y definir esquemas y modelos para nuestros datos.
const mongoose = require('mongoose');

// Definimos un esquema para la colección de administradores en la base de datos.
const AdminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: [true, "El nombre del admin es requerido"],
        validate: {
            validator: function (value) {
                // Validamos que el nombre tenga entre 4 y 10 caracteres.
                return value.length >= 4 && value.length <= 10;
            },
            message: 'El nombre del admin debe tener entre cuatro y diez caracteres.'
        }
    },
    adminLastname: {
        type: String,
        required: [true, "El apellido del admin es requerido"],
        validate: {
            validator: function (value) {
                // Validamos que el apellido tenga entre 4 y 10 caracteres.
                return value.length >= 4 && value.length <= 10;
            },
            message: 'El apellido del admin debe tener entre cuatro y diez caracteres.'
        }
    },
    adminDNI: {
        type: Number,
        required: [true, "El DNI del admin es requerido"],
        unique: true,
        validate: {
            validator: function (value) {
                // Validamos que el DNI tenga exactamente 10 dígitos.
                return value.toString().length === 10;
            },
            message: 'El DNI del admin debe tener diez números.'
        }
    },
    adminMail: {
        type: String,
        required: [true, "El correo del admin es requerido"],
        unique: true,
        validate: {
            validator: function (value) {
                // Validamos el formato de correo electrónico usando una expresión regular.
                const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
                return emailRegex.test(value);
            },
            message: 'El correo del admin no es válido.'
        }
    },
    adminPassword: {
        type: String,
        required: [true, "La contraseña del admin es requerida"],
        minlength: [6, "La contraseña debe tener al menos 6 caracteres"]
    },
    adminPhone: {
        type: Number,
        required: [true, "El número de teléfono del admin es requerido"],
        unique: true,
        validate: {
            validator: function (value) {
                // Validamos que el número de teléfono tenga exactamente 10 dígitos.
                return value.toString().length === 10;
            },
            message: 'El número de teléfono del admin debe tener diez números.'
        }
    }
});

// Creamos un índice único para DNI, teléfono y correo.
AdminSchema.index({ adminDNI: 1, adminPhone: 1, adminMail: 1 }, { unique: true });

// Creamos un modelo 'Admin' a partir del esquema definido, que nos permitirá interactuar con la colección de administradores en la base de datos.
const Admin = mongoose.model('Admin', AdminSchema);

// Exportamos el modelo 'Admin' para poder utilizarlo en otras partes de la aplicación.
module.exports = Admin;
