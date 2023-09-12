import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import CameraQr from "../../other/CameraQr";
import axios from "axios";
import "../../../styles/BrigadeScan_Style.css";

function BrigadeScan() {
  //State
  const [conScaner, setConScaner] = useState(false);
  //Almacenar el valor de la placa
  const [placa, setPlaca] = useState("");

  //Navigate
  let navigate = useNavigate();

  //Metodos
  const ControlScanner = () => {
    if (conScaner == true) {
      setConScaner(false);
      console.log(conScaner);
    } else {
      setConScaner(true);
      console.log(conScaner);
    }
  };

  //Metodo para enviar un reporte positivo
  const alertPositive = () => {
    if (placa != "" && placa != "Esperando código ...") {
      //Preparacion del informe
      //Obtenemos la fecha y hora actuales en el formato ("AAAA-MM-DD") ("HH:MM:SS")
      const fechaRegistro = new Date();
      const fechaA = fechaRegistro.toISOString().split("T")[0];
      const horaA = fechaRegistro.toTimeString().split(" ")[0];
      console.log(fechaA);
      console.log(horaA);
      //Mensaje predeterminado
      const registro = {
        alertaDate: fechaA,
        alertaHour: horaA,
        brigName: JSON.parse(sessionStorage.user)?.brigName,
        brigLastname: JSON.parse(sessionStorage.user)?.brigLastname,
        carPlate: placa,
        alertaIncident: "Verificado",
        alertaDescription: "Sin Novedad",
      };

      axios
        .post("http://localhost:8000/api/alerta/new", registro, {
          headers: { authorization: `Bearer ${sessionStorage?.loginToken}` },
        })
        .then((res) => {
          console.log("Alerta enviada");
          console.log(res);
          navigate("..");
        })
        .catch((err) => {
          console.log("Reporte rechazado");
          console.log(err);
        });
    } else {
      console.log("Error falta placa");
    }
  };

  return (
    <div className="main">
      <h1>Lector de Código QR</h1>
      {/*QR Camera*/}
      {conScaner == false ? (
        <div className=".qr_camera">
          <img src="https://img.freepik.com/vector-premium/car-guard-green-shield-logo-seguro-colision-automoviles-o-tienda-tienda-insignia-servicio-ajuste-vehiculos-o_502272-1242.jpg"></img>
        </div>
      ) : (
        <div className="contS">
          <CameraQr setplaca={setPlaca}></CameraQr>
        </div>
      )}

      <div className="controls">
        <div className="contS">
          <Button
            variant="contained"
            size="medium"
            style={{ color: "white", backgroundColor: blue[500] }}
            onClick={ControlScanner}
          >
            Escanear
          </Button>
        </div>
      </div>

      <div className="controlsS">
        <div className="contS">
          <Button
            variant="contained"
            size="medium"
            color="success"
            //Se reporta que no hay ninguna novedad con el auto
            onClick={alertPositive}
          >
            Vehiculo Verificado
          </Button>
        </div>
        <div className="contS">
          <Button
            variant="contained"
            size="medium"
            style={{ color: "white", backgroundColor: blue[500] }}
            onClick={() => navigate("../incident")}
          >
            Reportar Incidente
          </Button>
        </div>
        <div className="contS">
          <Button
            variant="contained"
            size="medium"
            color="error"
            onClick={() => navigate("..")}
          >
            Regresar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BrigadeScan;
