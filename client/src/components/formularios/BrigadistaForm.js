import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import axios from 'axios';

const BASE_API_URL = 'http://localhost:8000/api';

const BrigadistaForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        cedula: '',
        telefono: '',
        correo: '',
        direccion: '',
        password: '',
        confirmarPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            brigName: formData.nombre,
            brigLastname: formData.apellido,
            brigDNI: formData.cedula,
            brigMail: formData.correo,
            brigPassword: formData.password,
            brigPhone: formData.telefono,
            brigAddress: formData.direccion,
        };
    
        try {
          await axios.post(`${BASE_API_URL}/brigadista/new`, formattedData);
          navigate('/brigadistas'); // Utilizamos navigate para redirigir a la interfaz principal
        } catch (error) {
          console.error('Error adding admin:', error);
        }
      };

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isPasswordMatch = () => {
        return formData.password === formData.confirmarPassword;
    };

    const isNameValid = (name) => {
        return name.length >= 4 && name.length <= 10;
    };

    const isNumeric = (value) => {
        return /^\d+$/.test(value);
    };

    const isCedulaValid = (cedula) => {
        return cedula.length === 10 && isNumeric(cedula);
    };

    const isTelefonoValid = (telefono) => {
        return telefono.length === 10 && isNumeric(telefono);
    };

    const isAddressValid = (direccion) => {
        return direccion.length >= 10;
    };

    return (
        <form onSubmit={handleSubmit}>
        <h2>Información de Brigadista</h2>
        <Grid container spacing={2}>
            <Grid item xs={6}>
            <TextField
                name="nombre"
                label="Nombre"
                variant="outlined"
                fullWidth
                required
                value={formData.nombre}
                onChange={handleChange}
                error={!isNameValid(formData.nombre)}
                helperText={
                !isNameValid(formData.nombre) &&
                'El nombre debe tener entre 4 y 10 caracteres.'
                }
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                name="apellido"
                label="Apellido"
                variant="outlined"
                fullWidth
                required
                value={formData.apellido}
                onChange={handleChange}
                error={!isNameValid(formData.apellido)}
                helperText={
                !isNameValid(formData.apellido) &&
                'El apellido debe tener entre 4 y 10 caracteres.'
                }
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                name="cedula"
                label="Cédula de Identidad"
                variant="outlined"
                fullWidth
                required
                inputProps={{
                minLength: 10,
                maxLength: 10,
                pattern: '[0-9]+',
                }}
                value={formData.cedula}
                onChange={handleChange}
                error={!isCedulaValid(formData.cedula)}
                helperText={
                !isCedulaValid(formData.cedula) &&
                'Ingresa una cédula válida de 10 dígitos numéricos.'
                }
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                name="telefono"
                label="Teléfono"
                variant="outlined"
                fullWidth
                required
                inputProps={{
                minLength: 10,
                maxLength: 10,
                pattern: '[0-9]+',
                }}
                value={formData.telefono}
                onChange={handleChange}
                error={!isTelefonoValid(formData.telefono)}
                helperText={
                !isTelefonoValid(formData.telefono) &&
                'Ingresa un número de teléfono válido de 10 dígitos numéricos.'
                }
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                name="correo"
                label="Correo Electrónico"
                variant="outlined"
                fullWidth
                required
                value={formData.correo}
                onChange={handleChange}
                error={!isEmailValid(formData.correo)}
                helperText={
                !isEmailValid(formData.correo) &&
                'Ingresa un correo electrónico válido.'
                }
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                name="direccion"
                label="Dirección de Domicilio"
                variant="outlined"
                fullWidth
                required
                value={formData.direccion}
                onChange={handleChange}
                error={!isAddressValid(formData.direccion)}
                helperText={
                !isAddressValid(formData.direccion) &&
                'Ingresa una dirección de domicilio válida.'
                }
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                type="password"
                name="password"
                label="Contraseña"
                variant="outlined"
                fullWidth
                required
                value={formData.password}
                onChange={handleChange}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                type="password"
                name="confirmarPassword"
                label="Confirmar Contraseña"
                variant="outlined"
                fullWidth
                required
                value={formData.confirmarPassword}
                onChange={handleChange}
                error={!isPasswordMatch()}
                helperText={
                !isPasswordMatch() && 'Las contraseñas no coinciden.'
                }
            />
            </Grid>
            <Grid item xs={6}>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isPasswordMatch() || !isNameValid(formData.nombre) || !isNameValid(formData.apellido) || !isEmailValid(formData.correo) || !isCedulaValid(formData.cedula) || !isTelefonoValid(formData.telefono)}
            >
                Guardar
            </Button>
            </Grid>
            <Grid item xs={6}>
            <Button variant="contained" color="secondary" onClick={() => navigate('/brigadistas')}>
                Cancelar
            </Button>
            </Grid>
        </Grid>
        </form>
    );
};

export default BrigadistaForm;
