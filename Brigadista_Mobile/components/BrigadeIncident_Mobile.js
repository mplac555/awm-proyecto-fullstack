import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TextInput, Box, Button } from "@react-native-material/core";
import OptionIncident from "../other/OptionIncident";
import axios from "axios";

const BrigadeIncident_Mobile = ({ navigation, route }) => {
  //Direccion
  // const host = "192.168.1.48";
  const host = "localhost";
  //Obtener los parametros de la pagina del perfil
  const { name, last, email, token } = route.params;

  //Estado para almacenar todos los datos del componente de opciones
  //Tipo Placa descripcion
  const [typeIncident, setTypeIncident] = useState();
  const [type, setType] = useState("");
  const [nplaca, setNplaca] = useState("");
  const [description, setDescription] = useState("");
  const [OtherText, setOtherText] = useState("");

  //Metodo para tomar los valores del componente hijo
  //Metodos para almacenar el estado de la placa
  const handleTypeIncident = (vtypeIncident, vDescription, vother) => {
    setTypeIncident(vtypeIncident);
  };

  const handleNplaca = (vNplaca) => {
    setNplaca(vNplaca);
  };

  const handleDescription = (vDescription) => {
    setDescription(vDescription);
  };

  const handleTypeOther = (vother) => {
    setOtherText(vother);
  };

  //Metodo para enviar un reporte al Historial
  const SendReport = (e) => {
    e.preventDefault();
    //Preparacion del informe
    if (typeIncident == 1) {
      setType("Suplantacion");
      setDescription("");
    } else if (typeIncident == 2) {
      setType("Intruso");
      setDescription("");
    } else {
      setType("Otro");
    }
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
      carPlate: nplaca,
      alertaIncident: type + " " + OtherText,
      alertaDescription: description,
    };

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
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Reporte de Incidente</Text>
      <Box style={styles.box}>
        <Text style={styles.text}>Tipo de Incidente:</Text>

        <OptionIncident
          onType={handleTypeIncident}
          onPlaca={handleNplaca}
          onDescription={handleDescription}
          ontypeOther={handleTypeOther}
        ></OptionIncident>
      </Box>
      <Box style={styles.butonsPanel}>
        <Button
          title="Enviar"
          style={styles.button}
          backgroundColor={"rgba(46,125,50,255)"}
          onPress={SendReport}
        />

        <Button
          title="Cancelar"
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
    justifyContent: "start",
    backgroundColor: "rgba(56,123,238,255)",
  },
  titulo: {
    fontSize: 30,
    textAlign: "center",
    margin: "2%",
    backgroundColor: "rgba(120,217,115,255)",
    padding: "5%",
    fontWeight: "bold",
    width: "100%",
    marginBottom: "0%",
    marginTop: "0%",
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
    fontSize: 30,
    //alignItems: 'center',
    //justifyContent: 'center',
    //borderRadius: 10,
    width: "100%",
    height: "65%",
    backgroundColor: "white",
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
    // backgroundColor: 'blue',
  },
});
export default BrigadeIncident_Mobile;
