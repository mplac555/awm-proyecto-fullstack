//IMPORTS: dependencies
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/BrigadeProfile_Style.css";
//IMPORTS: components
import { blue } from "@mui/material/colors";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import axios from "axios";

function BrigadeProfile(props) {
  //Tomo los valores del estado global
  const { name, email } = sessionStorage;
  //Estado que almecena al brigadista encontrado
  const [brigade, setBrigade] = useState({});

  //Navigate
  let navigate = useNavigate();
  //Use effect para encontrar por el nombre y el email
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/brigadista/" + name + "/" + email, {
        headers: { authorization: `Bearer ${sessionStorage?.loginToken}` },
      })
      .then((res) => {
        setBrigade(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //Reloj
  const date = new Date();
  const [dataTime, setDataTime] = useState({
    horas: date.getHours(),
    minutos: date.getMinutes(),
    segundos: date.getSeconds(),
  });

  //Use effect
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setDataTime({
        horas: date.getHours(),
        minutos: date.getMinutes(),
        segundos: date.getSeconds(),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="main">
      <div className="container">
        <div className="cuadro">
          <h1>
            Bienvenido: {brigade.brigName} {brigade.brigLastname}
          </h1>
          <div>
            <Card
              sx={{
                maxWidth: "%80",
                backgroundColor: "white",
                margin: "2%",
                borderRadius: "15px",
              }}
            >
              <div className="contador">
                {dataTime.horas < 10 ? ` 0${dataTime.horas}` : dataTime.horas} h
                :
                {dataTime.minutos < 10
                  ? ` 0${dataTime.minutos}`
                  : dataTime.minutos}{" "}
                min :
                {dataTime.segundos < 10
                  ? ` 0${dataTime.segundos}`
                  : dataTime.segundos}{" "}
                seg
              </div>
              <CardMedia
                sx={{
                  height: "40%",
                  width: "50%",
                  margin: "auto",
                  border: "solid",
                  borderRadius: "15px",
                }}
                component="img"
                height="40%"
                image="https://i.gifer.com/origin/ee/ee93dbc6d7115c71190ed0e5e16bfbd6_w200.gif"
                alt="Perfil"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {brigade.brigName} {brigade.brigLastname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cédula: {brigade.brigDNI}
                </Typography>
              </CardContent>
            </Card>
            <div className="controls">
              <div className="cont">
                <Button
                  variant="contained"
                  size="medium"
                  color="success"
                  onClick={() => navigate("Scan")}
                >
                  Escanear Vehiculo
                </Button>
              </div>
              <div className="cont">
                <Button
                  variant="contained"
                  size="medium"
                  style={{ color: "white", backgroundColor: blue[500] }}
                  onClick={() => navigate("Incident")}
                >
                  Enviar Comentarios
                </Button>
              </div>
              <div className="cont">
                <Button
                  variant="contained"
                  size="medium"
                  color="error"
                  onClick={() => {
                    sessionStorage.clear();
                    navigate("/login");
                  }}
                >
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BrigadeProfile;
