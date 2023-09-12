// IMPORTS: dependencies
import { createElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Login_Style.css";
import axios from "axios";
//IMPORTS: components
import {
  Box,
  Button,
  Card,
  CardMedia,
  FormControl,
  // IconButton,
  MenuItem,
  Select,
  TextField,
  // Tooltip,
} from "@mui/material";
import {
  // ArrowBackIosNewRounded,
  EmailOutlined,
  Lock,
  Person,
  // PersonAdd,
} from "@mui/icons-material";
// IMPORTS: Methods
// import LoginMethods from "../../modules/LoginMethods";
// IMPORTS: data
// import {
//   initialBrigMembersList,
//   // brigMemberFields,
// } from "../../data/BrigMembersData";
// import { initialAdminsList } from "../../data/AdminsData";

const BASE_API_URL = "http://localhost:8000/api";

//styles
const estilo = {
  position: "absolute",
  left: -50,
  top: "25%",
  color: "white",
  fontSize: 35,
};
const iconos = {
  nombre: <Person sx={estilo} />,
  correo: <EmailOutlined sx={estilo} />,
  password: <Lock sx={estilo} />,
};
const campos = [
  { id: "nombre", label: "Nombre de Usuario" },
  { id: "correo", label: "Correo electrónico" },
  { id: "password", label: "Contraseña" },
];

function Login() {
  //State
  const [rol, definirRol] = useState("");
  const [userName, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setpassword] = useState("");
  const [eLogin, setELogin] = useState(false);
  //navigate
  let navigate = useNavigate();
  //Brigade list
  // const [list, _] = useState(initialBrigMembersList);
  //Admin list
  // const [listA] = useState(initialAdminsList);

  //Metodo que permite verificar el rol (Admin o brigadista y verifica que nombre, correo y contraseña coincida)
  async function loginHandler(e) {
    e.preventDefault();

    switch (rol) {
      case "Brigadista":
        await axios
          .post(`${BASE_API_URL}/brigadista/login`, {
            brigName: userName,
            brigMail: email,
            brigPassword: pass,
          })
          .then((res) => {
            let {
              _id,
              brigName,
              brigLastname,
              brigDNI,
              brigMail,
              brigPhone,
              token,
            } = res.data;
            sessionStorage.setItem("loginToken", token);
            sessionStorage.setItem(
              "user",
              JSON.stringify({
                _id,
                brigName,
                brigLastname,
                brigDNI,
                brigMail,
                brigPhone,
              })
            );
            sessionStorage.setItem("name", brigName);
            sessionStorage.setItem("email", brigMail);
            sessionStorage.setItem("role", "brig");
            // navigate(`/profile/${brigName}`);
            // navigate(`/profile/${brigName}/${brigMail}`);
            navigate("/profile");
          })
          .catch((err) => {
            setELogin(err);
          });
        break;
      case "Administrador":
        // console.log("rol →", rol);
        await axios
          .post(`${BASE_API_URL}/admin/login`, {
            adminName: userName,
            adminMail: email,
            adminPassword: pass,
          })
          .then((res) => {
            let {
              _id,
              adminName,
              adminLastname,
              adminDNI,
              adminMail,
              adminPhone,
              token,
            } = res.data;
            sessionStorage.setItem("loginToken", token);
            sessionStorage.setItem(
              "user",
              JSON.stringify({
                _id,
                adminName,
                adminLastname,
                adminDNI,
                adminMail,
                adminPhone,
              })
            );
            sessionStorage.setItem("role", "admin");
            navigate("/");
          })
          .catch((err) => {
            setELogin(err);
          });
        break;
      default:
        console.log("No se ha seleccionado el rol");
        break;
    }
  }

  return (
    // <div className="pasge-container pagina con-fondo">
    <div className="App-Login pagina">
      {/* <Card sx={{ width: 300 }}>
        <CardMedia
          component="img"
          height="194"
          // image="https://source.unsplash.com/random"
          image={require("../../resources/images/portada.png")}
        />
      </Card> */}
      <img
        src={require("../../resources/images/portada.png")}
        alt=""
        style={{ height: "300px" }}
      />
      <FormControl
        sx={{
          width: 255,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
        onSubmit={loginHandler}
      >
        <Select
          value={rol}
          onChange={(e) => definirRol(e.target.value)}
          displayEmpty
          sx={{ bgcolor: "white" }}
          required
        >
          <MenuItem value="">
            <em>Tipo de Usuario</em>
          </MenuItem>
          <MenuItem value="Administrador">Administrador</MenuItem>
          <MenuItem value="Brigadista">Brigadista</MenuItem>
        </Select>
        {campos.map((campo) => (
          <Box key={campo.id} sx={{ width: "100%", position: "relative" }}>
            {createElement(() => iconos[campo.id])}
            <TextField
              id={campo.id}
              required
              type={campo.id === "password" ? "password" : "text"}
              label={campo.label}
              variant="filled"
              sx={{ width: "100%" }}
              //Tomar los valores
              value={
                campo.id == "nombre"
                  ? userName
                  : campo.id === "correo"
                  ? email
                  : pass
              }
              onChange={(e) => {
                if (campo.id === "nombre") {
                  setuserName(e.target.value);
                } else if (campo.id === "correo") {
                  setEmail(e.target.value);
                } else if (campo.id === "password") {
                  setpassword(e.target.value);
                }
              }}
            />
          </Box>
        ))}

        {/* <Button variant="contained" onClick={startSession}> */}
        <Button variant="contained" onClick={loginHandler} type="submit">
          Iniciar Sesión
        </Button>
        {eLogin && (
          <Box style={{ background: "#00000077", padding: "10px" }}>
            <p style={{ color: "#FF3333", margin: 0 }}>
              {eLogin?.response?.data?.message
                ? eLogin.response.data.message
                : "Error desconocido en el inicio de sesión..."}
            </p>
          </Box>
        )}
      </FormControl>
    </div>
    // </div>
  );
}

export default Login;
