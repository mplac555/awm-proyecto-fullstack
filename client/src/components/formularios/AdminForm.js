import React, { useEffect, useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom"; // Importamos useNavigate
import axios from "axios";
import ListManager from "../../modules/ListManager";

const BASE_API_URL = "http://localhost:8000/api";

const AdminForm = ({ list }) => {
  const navigate = useNavigate();
  const { id: adminID } = useParams();

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    telefono: "",
    correo: "",
    password: "",
    confirmarPassword: "",
  });

  useEffect(() => {
    if (!adminID) {
      setLoading(false);
      return;
    }
    setLoading(true);
    axios
      .get(`${BASE_API_URL}/admin/${adminID}`, {
        headers: { authorization: `Bearer ${sessionStorage?.loginToken}` },
      })
      .then((res) => {
        setFormData({
          id: res.data._id,
          nombre: res.data.adminName,
          apellido: res.data.adminLastname,
          cedula: res.data.adminDNI,
          telefono: res.data.adminPhone,
          correo: res.data.adminMail,
          password: res.data.adminPassword,
          confirmarPassword: res.data.adminPassword,
        });
        setLoading(false);
      })
      .catch((err) => {
        setFetchError(
          `Existió algún error al guardar los nuevos datos (${err}).`
        );
        setLoading(false);
      });
  }, [adminID]);

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
      adminName: formData.nombre,
      adminLastname: formData.apellido,
      adminDNI: formData.cedula,
      adminMail: formData.correo,
      adminPassword: formData.password,
      adminPhone: formData.telefono,
    };

    try {
      if (adminID) {
        let nuevoAdmin = await axios.put(
          `${BASE_API_URL}/admin/${formData.id}`,
          {
            _id: formData.id,
            ...formattedData,
          },
          {
            headers: { authorization: `Bearer ${sessionStorage?.loginToken}` },
          }
        );
        ListManager.editElement(list, nuevoAdmin.data);
        let user = JSON.parse(sessionStorage?.user);
        if (adminID === user?._id) {
          sessionStorage.setItem(
            "user",
            JSON.stringify({
              ...user,
              adminName: formattedData.adminName,
              adminLastname: formattedData.adminLastname,
            })
          );
          navigate("/"); // Utilizamos navigate para redirigir a la interfaz principal
        } else {
          navigate("/administradores"); // Utilizamos navigate para redirigir a la interfaz principal
        }
      } else {
        let nuevoAdmin = await axios.post(
          `${BASE_API_URL}/admin/new`,
          formattedData,
          {
            headers: { authorization: `Bearer ${sessionStorage?.loginToken}` },
          }
        );
        ListManager.add(list, nuevoAdmin.data);
        navigate("/administradores"); // Utilizamos navigate para redirigir a la interfaz principal
      }
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email === "" || emailRegex.test(email);
  };

  const isPasswordMatch = () => {
    return (
      formData.confirmarPassword === "" ||
      formData.password === formData.confirmarPassword
    );
  };

  const isNameValid = (name) => {
    return name === "" || (name.length >= 4 && name.length <= 10);
  };

  const isLastNameValid = (lastName) => {
    return lastName === "" || (lastName.length >= 4 && lastName.length <= 10);
  };

  const isNumeric = (value) => {
    return /^\d+$/.test(value);
  };

  const isCedulaValid = (cedula) => {
    return cedula === "" || (`${cedula}`.length === 10 && isNumeric(cedula));
  };

  const isTelefonoValid = (telefono) => {
    return (
      telefono === "" || (`${telefono}`.length === 10 && isNumeric(telefono))
    );
  };

  if (loading) return <h3>Cargando información...</h3>;
  if (fetchError) return <h3>{fetchError}</h3>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Información del Administrador</h2>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            name="nombre"
            label="Nombre"
            variant="outlined"
            fullWidth
            required
            value={formData.nombre || ""}
            onChange={handleChange}
            error={!isNameValid(formData.nombre)}
            helperText={
              !isNameValid(formData.nombre) &&
              "El nombre debe tener entre 4 y 10 caracteres."
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
            value={formData.apellido || ""}
            onChange={handleChange}
            error={!isLastNameValid(formData.apellido)}
            helperText={
              !isLastNameValid(formData.apellido) &&
              "El apellido debe tener entre 4 y 10 caracteres."
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="cedula"
            label="Cédula de Identidad"
            variant="outlined"
            type="number"
            fullWidth
            required
            inputProps={{
              minLength: 10,
              maxLength: 10,
              pattern: "[0-9]+",
            }}
            value={formData.cedula || ""}
            onChange={handleChange}
            error={!isCedulaValid(formData.cedula)}
            helperText={
              !isCedulaValid(formData.cedula) &&
              "Ingresa una cédula válida de 10 dígitos numéricos."
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="telefono"
            label="Teléfono"
            variant="outlined"
            type="number"
            fullWidth
            required
            inputProps={{
              minLength: 10,
              maxLength: 10,
              pattern: "[0-9]+",
            }}
            value={formData.telefono || ""}
            onChange={handleChange}
            error={!isTelefonoValid(formData.telefono)}
            helperText={
              !isTelefonoValid(formData.telefono) &&
              "Ingresa un número de teléfono válido de 10 dígitos numéricos."
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
            value={formData.correo || ""}
            onChange={handleChange}
            error={!isEmailValid(formData.correo)}
            helperText={
              !isEmailValid(formData.correo) &&
              "Ingresa un correo electrónico válido."
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
            value={formData.password || ""}
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
            value={formData.confirmarPassword || ""}
            onChange={handleChange}
            error={!isPasswordMatch()}
            helperText={!isPasswordMatch() && "Las contraseñas no coinciden."}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={
              !isPasswordMatch() ||
              !isNameValid(formData.nombre) ||
              !isNameValid(formData.apellido) ||
              !isEmailValid(formData.correo) ||
              !isCedulaValid(formData.cedula) ||
              !isTelefonoValid(formData.telefono)
            }
          >
            Guardar
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              // navigate(
              //   adminID && adminID === JSON.parse(sessionStorage?.user?._id)
              //     ? "/"
              //     : "/administradores"
              // )
              navigate("/administradores")
            }
          >
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AdminForm;
