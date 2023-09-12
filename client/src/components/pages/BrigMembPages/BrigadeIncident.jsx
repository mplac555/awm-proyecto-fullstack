import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  TextField,
} from "@mui/material";
import axios from "axios";

import "../../../styles/BrigadeIncident_Style.css";

function BrigadeIncident(props) {
  const { name, last, email } = props;

  //Estado para almacenar el valor de los radio Buton seleccionado
  const [typeIncident, setTypeIncident] = useState();
  //Estado para controlar cuando se tiene un reporte de tipo OTRO
  const [inOther, setInOther] = useState(false);
  //Estados para almacenar los valores de Numero de Placa, Descripcion, Tipo de accidente Otro
  const [nplaca, setNplaca] = useState("");
  const [description, setDescription] = useState("");
  const [OtherText, setOtherText] = useState("");

  //Navigate
  let navigate = useNavigate();

  const handleRadioChange = (event) => {
    //Variable auxiliar
    const valorSelect = event.target.value;
    //Almaceno el valor
    setTypeIncident(valorSelect);
    console.log(valorSelect);

    if (event.target.value === "Otro") {
      setInOther(true);
    } else {
      setInOther(false);
    }
  };

  //Metodo para enviar un reporte al Historial
  const SendReport = (e) => {
    e.preventDefault();
    //e.preventDefault();
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
      carPlate: nplaca,
      alertaIncident: typeIncident + " " + OtherText,
      alertaDescription: description,
    };

    axios
      .post("http://localhost:8000/api/alerta/new", registro, {
        headers: { authorization: `Bearer ${sessionStorage?.loginToken}` },
      })
      .then((res) => {
        console.log("Alerta enviada");
        console.log(res);
        // navigate("/profile/" + name + "/" + email);
        navigate("..");
      })
      .catch((err) => {
        console.log("Reporte rechazado");
        console.log(err);
      });
  };

  return (
    <div className="containerI">
      <div className="contI">
        <h1>Reporte de Incidente</h1>
        <br />
        <FormControl>
          <FormLabel
            id="demo-radio-buttons-group-label"
            sx={{ textAlign: "left" }}
          >
            {" "}
            <h3>Incidente:</h3>
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            onChange={handleRadioChange}
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="Suplantación"
              control={<Radio />}
              label="Suplantación: (Codigo QR no coincide.)"
            />
            <FormControlLabel
              value="Intruso"
              control={<Radio />}
              label="Intruso: No contiene codigo QR"
            />
            <FormControlLabel value="Otro" control={<Radio />} label="Otro:" />
          </RadioGroup>
          {inOther === true ? (
            <div>
              <TextField
                label="Especifique el Incidente:"
                sx={{ width: "100%", margin: "2%" }}
                onChange={(e) => {
                  setOtherText(e.target.value);
                }}
              />
            </div>
          ) : (
            ""
          )}
        </FormControl>
      </div>
      <h2>Descripción del Incidente</h2>
      <br />
      <div>
        <TextField
          label="Número de PLACA:"
          sx={{ width: "30%", margin: "2%" }}
          onChange={(e) => {
            setNplaca(e.target.value);
          }}
        />
      </div>
      <div>
        <TextField
          label="Descripción (Opcional)"
          multiline
          rows={5}
          sx={{ width: "30%", margin: "2%" }}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>

      <div className="controls">
        <div className="cont">
          <Button
            variant="contained"
            size="medium"
            color="success"
            onClick={SendReport}
          >
            Enviar
          </Button>
        </div>

        <div className="cont">
          <Button
            variant="contained"
            size="medium"
            color="error"
            // onClick={() => navigate("/profile/" + name + "/" + email)}
            onClick={() => navigate("..")}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BrigadeIncident;
