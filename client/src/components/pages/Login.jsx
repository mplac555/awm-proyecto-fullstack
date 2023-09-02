// IMPORTS: dependencies
import {createElement, useState} from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Login_Style.css";
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
  initialBrigMembersList,brigMemberFields,} from "../../data/BrigMembersData";
import { initialAdminsList } from "../../data/AdminsData";

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
  {id: "nombre", label: "Nombre de Usuario"},
  {id: "correo", label: "Correo electrónico"},
  {id: "password", label: "Contraseña"},
];

function Login() {

  //State
  const [rol, definirRol] = useState("");
  const [userName, setuserName] = useState("");
  const [email,setEmail] = useState("");
  const [pass,setpassword] = useState("");
  const [eLogin, setELogin] = useState("");
  //navigate
  let navigate = useNavigate();
  //Brigade list
  const [list, _] = useState(initialBrigMembersList);
  //Admin list
  const [listA] = useState(initialAdminsList);

  //Metodo que permite verificar el rol (Admin o brigadista y verifica que nombre, correo y contraseña coincida)
  const startSession = () =>{
    //Admin login
    if(rol == "Administrador"){

      console.log("Eres un admin");
      const atributosA = {vname: userName, vemail: email, vpassword: pass};
      const encontradoA = LoginMethods.loginBrigade(listA,atributosA);
      console.log(encontradoA);

      if(encontradoA != null){

        console.log("Exitoso");
        console.log(encontradoA);
        navigate("/");
      }else{
        console.log("Error");
        setELogin("El Correo, el Nombre del Usuario o la Contraseña son Incorrectos. Por favor Intentelo de nuevo.")
      }

    //Brigade login
    }else if(rol == "Brigadista"){
      console.log("Eres un brigadista");
      const atributos = {vname: userName, vemail: email, vpassword: pass};
      const encontrado = LoginMethods.loginBrigade(list,atributos);

      if(encontrado != null){

        console.log("Exitoso");
        console.log(encontrado);
        navigate("/profile/"+userName);
      }else{
        console.log("Error");
        setELogin("El Correo, el Nombre del Usuario o la Contraseña son Incorrectos. Por favor Intentelo de nuevo.")
      }

    }else{
      console.log("No ha seleccionado nada");
      setELogin("Error al Iniciar Sesion, por favor Intentelo de nuevo.");
    }
    

  }
  return (
    <div className="App-Login">
      
      <Card sx={{width: 300}}>
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
      >
        <Select
          value={rol}
          onChange={(e) => definirRol(e.target.value)}
          displayEmpty
          sx={{bgcolor: "white"}}
        >
          <MenuItem value="">
            <em>Tipo de Usuario</em>
          </MenuItem>
          <MenuItem value="Administrador">Administrador</MenuItem>
          <MenuItem value="Brigadista">Brigadista</MenuItem>
        </Select>
        {campos.map((campo) => (
          <Box key={campo.id} sx={{width: "100%", position: "relative"}}>
            {createElement(() => iconos[campo.id])}
            <TextField
              id={campo.id}
              label={campo.label}
              variant="filled"
              sx={{width: "100%"}}

              //Tomar los valores
              value={campo.id == "nombre" ? userName: campo.id === "correo" ? email : pass}

              onChange={(e) => {
                if (campo.id === "nombre"){
                  setuserName(e.target.value);

                }else if(campo.id === "correo"){
                  setEmail(e.target.value);
                }else if(campo.id === "password"){
                  setpassword(e.target.value);
                }
              }}
            />
          </Box>
        ))}
       
          <Button variant="contained" onClick={startSession}>Iniciar Sesión</Button>
          <p style={{color: 'red'}}>{eLogin}</p>
      
       
      </FormControl>
    </div>
  );
}

export default Login;