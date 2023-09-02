import React from "react";
import { useState } from "react";
import { useZxing } from "react-zxing";
import { Button } from "@mui/material";
import { blue } from '@mui/material/colors';
import { useNavigate, useLocation } from "react-router-dom";
import CameraQr from "../other/CameraQr";
import '../../styles/BrigadeScan_Style.css';

function BrigadeScan() {
   //State   
   const [conScaner, setConScaner] = useState(false);

   //Navigate
   let navigate = useNavigate();
   const location = useLocation();
   const keyName = location.state && location.state.keyName;
   //Metodos 
   const ControlScanner = () =>{
    if(conScaner == true)
    {
      setConScaner(false);
      console.log(conScaner);
    }else
    {
      setConScaner(true);
      console.log(conScaner);
    }
  };
   
  return (
    <div className="main">
      <h1>Lector de Código QR</h1>
       {/*QR Camera*/}
       {conScaner == false ? 
       (
        <div className=".qr_camera">
          <img
           
           src="https://img.freepik.com/vector-premium/car-guard-green-shield-logo-seguro-colision-automoviles-o-tienda-tienda-insignia-servicio-ajuste-vehiculos-o_502272-1242.jpg"></img>
        </div>
       ):(
        <div className="contS">
          <CameraQr></CameraQr>
        </div>
       )
       } 
       
       
      <div className="controls">
        <div className="contS">
            <Button variant="contained" size="medium" style={{color:"white" ,backgroundColor: blue[500]}}
              onClick={ControlScanner}
            >
              Escanear
            </Button>
        </div>
      </div>
       
      <div className="controlsS">

        <div className="contS">
          
           <Button variant="contained" size="medium" color="success" 
           //Aqui al presionar se envia a la base de datos que no hay novedad
           //onClick={()=> navigate("/login/profile/"+infoBrig.nombre+"/scan")}
           >
            Vehiculo Verificado
          </Button>
      
        </div>
        <div className="contS">
            <Button variant="contained" size="medium" style={{color:"white" ,backgroundColor: blue[500]}}
            onClick={()=> navigate("/profile/"+keyName+"/incident", {state: {keyName}})}
            >
              Reportar Incidente
            </Button>
        </div>
        <div className="contS">
            <Button variant="contained" size="medium" color="error" 
            onClick={()=> navigate("/profile/"+keyName)} 
            >
              Regresar
            </Button>
        </div>
      </div>
    
    </div>
  );
}

export default BrigadeScan;