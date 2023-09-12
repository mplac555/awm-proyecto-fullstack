import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TextInput, Box, Button } from "@react-native-material/core";
import CameraQr from "../other/CamerQr";
import axios from "axios";

const BrigadeScan_Mobile = ({ navigation, route }) => {
  //Direccion
  // const host = "192.168.1.48";
  const host = "localhost";
  //Obtener los parametros de la pagina del perfil
  const { name, last, email, token } = route.params;
  //Para activar el Scanneo
  const [conScaner, setConScaner] = useState(false);

  //Variables de estado para la hacer el reporte
  const [placa, setPlaca] = useState("");

  //Metodo para almacenar el estado de la placa
  const handlePlacaChnage = (vplaca) => {
    setPlaca(vplaca);
  };

  //Metodo para cambiar el estado del Scanner
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
    if (placa != "" && placa != "Buscando código QR") {
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
        brigName: name,
        brigLastname: last,
        carPlate: placa,
        alertaIncident: "Verificado",
        alertaDescription: "Sin Novedad",
      };

      console.log(registro);
      axios
        .post("http://" + host + ":8000/api/alerta/new", registro, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("Alerta enviada");
          //console.log(res);
          navigation.navigate("BrigadeProfile_Mobile", {
            userName: name,
            email: email,
          });
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
    <View style={styles.container}>
      <Text style={styles.titulo}>Lector de Código QR</Text>
      <Box style={styles.box}>
        {conScaner == false ? (
          <Image
            style={styles.img}
            source={require("../assets/vehiculo.png")}
          ></Image>
        ) : (
          <CameraQr onTextChange={handlePlacaChnage}></CameraQr>
        )}

        <Button
          title={conScaner == false ? "Escanear" : "Cancelar"}
          style={styles.button}
          backgroundColor={"rgba(33,150,243,255)"}
          onPress={ControlScanner}
        />
      </Box>
      <Box style={styles.butonsPanel}>
        <Button
          title="Verificar"
          style={styles.button}
          backgroundColor={"rgba(46,125,50,255)"}
          onPress={() => alertPositive()}
        />
        <Button
          title="Reportar"
          style={styles.button}
          backgroundColor={"rgba(33,150,243,255)"}
          onPress={() =>
            navigation.navigate("BrigadeIncident_Mobile", {
              name: name,
              last: last,
              email: email,
              token,
            })
          }
        />
        <Button
          title="Regresar"
          style={styles.button}
          backgroundColor={"rgba(211,47,47,255)"}
          onPress={() =>
            navigation.navigate("BrigadeProfile_Mobile", {
              userName: name,
              email: email,
            })
          }
        />
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(56,123,238,255)",
  },
  titulo: {
    fontSize: 30,
    textAlign: "center",
    margin: "2%",
    backgroundColor: "rgba(120,217,115,255)",
    //borderRadius: 10,
    padding: "5%",
    fontWeight: "bold",
    width: "100%",
  },

  img: {
    width: "80%",
    height: "70%",
    margin: "2%",
  },

  button: {
    alignItems: "center",
    borderRadius: 5,
    margin: "2%",
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 25,
    width: "100%",
    fontFamily: "sans-serif",
    margin: "2%",
    textAlign: "center",
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "100%",
    height: "60%",
    //backgroundColor: 'red'
  },
  boxCard: {
    backgroundColor: "white",
    height: "70%",
    width: "90%",
    margin: "2%",
    borderRadius: 10,
    alignItems: "center",
  },
  butonsPanel: {
    flexDirection: "row", // Esto coloca los elementos en una fila
    alignItems: "center", // Esto alinea los elementos verticalmente en el centro
    justifyContent: "space-around", // Esto distribuye el espacio entre los elementos
    margin: "2%",
    width: "100%",
    backgroundColor: "blue",
  },
});

export default BrigadeScan_Mobile;
