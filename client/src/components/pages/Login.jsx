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
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  ArrowBackIosNewRounded,
  EmailOutlined,
  Lock,
  Person,
  PersonAdd,
} from "@mui/icons-material";
// IMPORTS: Methods
import LoginMethods from "../../modules/LoginMethods";
// IMPORTS: data
import {
  initialBrigMembersList,
  brigMemberFields,
} from "../../data/BrigMembersData";
import { initialAdminsList } from "../../data/AdminsData";

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
  const [list, _] = useState(initialBrigMembersList);
  //Admin list
  const [listA] = useState(initialAdminsList);

  //Metodo que permite verificar el rol (Admin o brigadista y verifica que nombre, correo y contraseña coincida)
  const startSession = () => {
    //Admin login
    if (rol == "Administrador") {
      console.log("Eres un admin");
      const atributosA = { vname: userName, vemail: email, vpassword: pass };
      const encontradoA = LoginMethods.loginBrigade(listA, atributosA);
      console.log(encontradoA);

      if (encontradoA != null) {
        console.log("Exitoso");
        console.log(encontradoA);
        navigate("/");
      } else {
        console.log("Error");
        setELogin(
          "El Correo, el Nombre del Usuario o la Contraseña son Incorrectos. Por favor Intentelo de nuevo."
        );
      }

      //BrigadeMember login
    } else if (rol == "Brigadista") {
      console.log("Eres un brigadista");
      const atributos = { vname: userName, vemail: email, vpassword: pass };
      const encontrado = LoginMethods.loginBrigade(list, atributos);

      if (encontrado != null) {
        console.log("Exitoso");
        console.log(encontrado);
        navigate("/profile/" + userName);
      } else {
        console.log("Error");
        setELogin(
          "El Correo, el Nombre del Usuario o la Contraseña son Incorrectos. Por favor Intentelo de nuevo."
        );
      }
    } else {
      console.log("No ha seleccionado nada");
      setELogin("Error al Iniciar Sesion, por favor Intentelo de nuevo.");
    }
  };

  async function loginHandler(e) {
    e.preventDefault();
    // let res;

    switch (rol) {
      case "Brigadista":
        // console.log("rol →", rol);
        // try {
        //   res = await axios.post(`${BASE_API_URL}/brigadista/login`, {
        //     brigName: userName,
        //     brigMail: email,
        //     brigPassword: pass,
        //   });
        //   let {
        //     _id,
        //     brigName,
        //     brigLastname,
        //     brigDNI,
        //     brigMail,
        //     brigPhone,
        //     token,
        //   } = res.data;
        //   sessionStorage.setItem("loginToken", token);
        //   sessionStorage.setItem("usuario", {
        //     _id,
        //     brigName,
        //     brigLastname,
        //     brigDNI,
        //     brigMail,
        //     brigPhone,
        //   });
        //   navigate(`/profile/${brigName}`);
        // } catch (err) {
        //   console.log("err", err);
        //   console.log("res", res);
        //   setELogin(
        //     res?.data?.message
        //       ? res?.data?.message
        //       : `Error en el inicio de sesión (${err})`
        //   );
        // }
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
            sessionStorage.setItem("usuario", {
              _id,
              brigName,
              brigLastname,
              brigDNI,
              brigMail,
              brigPhone,
            });
            navigate(`/profile/${brigName}`);
          })
          .catch((err) => {
            // console.log("err", err);
            // console.log("res", res);
            setELogin(err);
            // setELogin(
            //   res?.data?.message
            //     ? res?.data?.message
            //     : `Error en el inicio de sesión (${err})`
            // );
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
            sessionStorage.setItem("usuario", {
              _id,
              adminName,
              adminLastname,
              adminDNI,
              adminMail,
              adminPhone,
            });
            navigate("/");
          })
          .catch((err) => {
            setELogin(err);
            // setELogin(
            //   res.data?.message
            //     ? res.data.message
            //     : "Error desconocido en el inicio de sesión..."
            // );
          });
        break;
      default:
        console.log("No se ha seleccionado el rol");
        break;
    }
  }

  return (
    <div className="App-Login">
      <Card sx={{ width: 300 }}>
        <CardMedia
          component="img"
          height="194"
          image="https://source.unsplash.com/random"
        />
      </Card>
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
  );
}

export default Login;
