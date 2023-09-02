import React from "react";
import { useState } from "react";
import { useZxing } from "react-zxing";

import '../../styles/BrigadeScan_Style.css';

function CameraQr () {

    //Estados que almacena el valor escaneado y se verifica si se escanea o no
   const [result, setResult] = useState("Esperando código ...");

   //Ref permite que tengamos acceso a la camara
    const { ref } = useZxing({
    onDecodeResult(result) {
     
      setResult(result.getText());
      
    },
    });

    return(
        <div className="camera">
        
            <video className="qr_camera" ref={ref} />
            <h3>{result}</h3>
        </div>
    );
}

export default CameraQr;