//IMPORTS: dependencies
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import '../../styles/BrigadeProfile_Style.css'
//IMPORTS: components
import { blue } from '@mui/material/colors';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';

// IMPORTS: Methods
import LoginMethods from "../../modules/LoginMethods";
// IMPORTS: data
import {
  initialBrigMembersList,
} from "../../data/BrigMembersData";

function BrigadeProfile() {

//Lista de Brigadistas
  const [list, _] = useState(initialBrigMembersList);

    //Navigate
    let navigate = useNavigate();
    let {name} = useParams();

    var brigadeP = LoginMethods.searchElementByName(list,name);   
    var keyName = brigadeP.name; 
    
    
    //Reloj
    const date = new Date();
    const [dataTime, setDataTime] = useState({
        horas: date.getHours(),
        minutos: date.getMinutes(),
        segundos: date.getSeconds()
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
          
            <h1>Bienvenido: {brigadeP.name} {brigadeP.last}</h1>
            <div >
              <Card sx={{ 
                maxWidth :"%80",
                backgroundColor: "white",
                margin: "2%",
                borderRadius: "15px"
                }} >

                <div className="contador">
                  {dataTime.horas < 10 ? 
                  ` 0${dataTime.horas}` : dataTime.horas} h : 
                  {dataTime.minutos < 10 ? ` 0${dataTime.minutos}` : dataTime.minutos} min : 
                  {dataTime.segundos < 10 ? ` 0${dataTime.segundos}` : dataTime.segundos} seg
                  
                </div>
                <CardMedia sx={{height: "40%", width :"50%", margin: "auto", border: "solid", borderRadius: "15px",}}
                  component="img"
                  height="40%"
                  image= {brigadeP.avatar}
                  alt="Perfil"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {brigadeP.name} {brigadeP.last}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Edad: {brigadeP.age}
                  </Typography>
                  </CardContent>
                
              </Card>
              <div className="controls">

                <div className="cont">
                  
                  <Button variant="contained" size="medium" color="success" 
                  onClick={()=> navigate("/profile/"+brigadeP.name+"/Scan", { state: { keyName } })}
                  >
                    Escanear Vehiculo
                  </Button>

                </div>
                <div className="cont">
                    <Button variant="contained" size="medium" style={{color:"white" ,backgroundColor: blue[500]}}
                    onClick={()=> navigate("/profile/"+brigadeP.name+"/Incident", {state: {keyName}})}
                    >
                      Enviar Comentarios
                    </Button>
                </div>
                <div className="cont">
                    <Button variant="contained" size="medium" color="error" onClick={()=> navigate("/login")} >
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

