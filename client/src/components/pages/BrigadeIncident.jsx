import React  from "react";
import {useState,}  from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {Button,Radio ,RadioGroup, FormControlLabel, FormControl, FormLabel, Box, TextField} from "@mui/material";

import '../../styles/BrigadeIncident_Style.css';

function BrigadeIncident() {

  //State
  const [inOther, setInOther] = useState(false);
  //Navigate
  let navigate = useNavigate();
  const location = useLocation();
  const keyName = location.state && location.state.keyName;

  
  const handleRadioChange = (event) => {
    if (event.target.value === "Otro") {
      setInOther(true);
    } else {
      setInOther(false);
    }
  };

  return (
    <div className="containerI">
      <div className="contI">
        <h1>Reporte de Incidente</h1>
        <br />
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label" sx={{textAlign: "left"}}> <h3>Incidente:</h3></FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                onChange={handleRadioChange}
                name="radio-buttons-group"
            >
            <FormControlLabel value="Suplantación" control={<Radio />} label="Suplantación: (Codigo QR no coincide.)" />
            <FormControlLabel value="Intruso" control={<Radio />} label="Intruso: No contiene codigo QR" />
            <FormControlLabel value="Otro" control={<Radio />} label="Otro:" 
           />
            </RadioGroup>
            {inOther=== true ? (
                <div>
                <TextField
                    label="Especifique el Incidente:"
                    sx={{width: "100%", margin: "2%"}}
                />
                 </div>
            ): ""}
            
        </FormControl>
      </div>
      <h2>Descripción del Incidente</h2>
      <br />
      <div>
        <TextField
            label="Número de PLACA:"
            sx={{width: "30%", margin: "2%"}}
        />
      </div>
      <div>
        <TextField
          label="Descripción (Opcional)"
          multiline
          rows={5}
          sx={{width: "30%", margin: "2%"}}
        />
      </div>
      <div>
        <h2>Evidencia Fotográfica (Opcional)</h2>
        //-------Pendiente
      </div>
       
      <div className="controls">

      <div className="cont">
        
        <Button variant="contained" size="medium" color="success" 
        // onClick={()=> navigate("/profile/")}
        >
          Enviar
        </Button>

      </div>
      
      <div className="cont">
          <Button variant="contained" size="medium" color="error"
          
          onClick={()=> navigate("/profile/"+keyName)} 
           >
            Cancelar
          </Button>
      </div>
      </div>
    </div>
     
   
  );
}

export default BrigadeIncident;