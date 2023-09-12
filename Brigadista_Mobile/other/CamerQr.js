import React, {useState, useEffect}from "react";
import { StyleSheet, Text, View} from 'react-native';
import { Box,  Button } from "@react-native-material/core";
import {BarCodeScanner} from 'expo-barcode-scanner';

const CameraQr = ({onTextChange}) =>{
    //Permisos
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned,setScanned] = useState(false);
    const [text, setText] = useState("Buscando código QR");
    
    //Preguntar por los permisos de la camara
    const askForCameraPermission = () =>{
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted')
        })() 
    }
    //Consultar los permisos de la camara apenas se cargue el componente
    useEffect(()=>{
        askForCameraPermission();
    },[]);

    //Al momento de escanaer el codigo QR
    const handleBaCodeScanned = ({type, data}) =>{
        setScanned(true);
        setText(data);
        onTextChange(data);

        console.log('Type: '+ type + '\nDtata: '+data);
    }

    //Diferentes tipos de Returns dependiendo de la asignacion de permisos3
    if(hasPermission == null){
        return(
            <View>
                <Text>Solicitando permiso de la Camara </Text>
            </View>
        )
    }
    if(hasPermission == false){
        return(
            <View>
                <Text style={{margin: 10}}>Sin acceso a la Camara</Text>
                <Button title={'Otorgar Permisos'}
                onPress={()=> askForCameraPermission()}
                />
            </View>
        )
    }

    //Retorno si se dieron los permisos 
    return(
        <View>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined: handleBaCodeScanned }
                style={{height: 300, width: 300}}
                ></BarCodeScanner>
            </View>
            <Text style={styles.maintext}>{text}</Text>
            {scanned && <Button title={'Escanaer de nuevo'} onPress={() => setScanned(false)} color="tomato"></Button>}

        </View>
    );
}


const styles = StyleSheet.create({
    barcodebox: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 10,
    },
    maintext:{
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20,
        textAlign: 'center',

    }
})
export default CameraQr;