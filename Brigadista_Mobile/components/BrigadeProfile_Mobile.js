import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput, Box } from "@react-native-material/core";
import {
  IconComponentProvider,
  Icon,
  Button,
} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";

const BrigadeProfile_Mobile = ({ navigation, route }) => {
  //Direccion
  // const host = "192.168.1.48";
  const host = "localhost";
  //Obtener los parametros de la pagina del Login
  const { userName, email, token } = route.params;
  //Estado que almecena al brigadista encontrado
  const [brigade, setBrigade] = useState({});

  //Reloj
  const date = new Date();
  const [dataTime, setDataTime] = useState({
    horas: date.getHours(),
    minutos: date.getMinutes(),
    segundos: date.getSeconds(),
  });

  //Use efect para buscar a un brigadista por su nombre y correo
  useEffect(() => {
    axios
      .get(
        "http://" + host + ":8000/api/brigadista/" + userName + "/" + email,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setBrigade(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //Use effect del Reloj
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
    <View style={styles.container}>
      <Box w={"95%"} h={"95%"} m={15} style={styles.box}>
        <Text style={styles.text}>
          Bienvenido: {brigade.brigName} {brigade.brigLastname}
        </Text>
        <Box style={styles.boxCard}>
          <Text style={styles.reloj}>
            {dataTime.horas < 10 ? ` 0${dataTime.horas}` : dataTime.horas} h :
            {dataTime.minutos < 10 ? ` 0${dataTime.minutos}` : dataTime.minutos}{" "}
            min :
            {dataTime.segundos < 10
              ? ` 0${dataTime.segundos}`
              : dataTime.segundos}{" "}
            seg
          </Text>

          <Image
            style={styles.img}
            source={{
              uri: "https://i.gifer.com/origin/ee/ee93dbc6d7115c71190ed0e5e16bfbd6_w200.gif",
            }}
            alt="Logo"
          ></Image>

          <Text>
            {brigade.brigName} {brigade.brigLastname}
          </Text>
          <Text>Cédula: {brigade.brigDNI}</Text>
        </Box>
        <Box style={styles.butonsPanel}>
          <Button
            title="Escanear"
            style={styles.button}
            backgroundColor={"rgba(46,125,50,255)"}
            onPress={() =>
              navigation.navigate("BrigadeScan_Mobile", {
                name: brigade.brigName,
                last: brigade.brigLastname,
                email: email,
                token,
              })
            }
          />
          <Button
            title="Comentarios"
            style={styles.button}
            backgroundColor={"rgba(33,150,243,255)"}
            onPress={() =>
              navigation.navigate("BrigadeIncident_Mobile", {
                name: brigade.brigName,
                last: brigade.brigLastname,
                email: email,
                token,
              })
            }
          />
        </Box>
        <Button
          title="Cerrar Sessión"
          style={styles.button}
          backgroundColor={"rgba(211,47,47,255)"}
          onPress={() => navigation.navigate("BrigadeLogin")}
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
  reloj: {
    fontSize: 30,
    textAlign: "center",
    margin: "2%",
    backgroundColor: "rgba(78,75,199,255)",
    borderRadius: 10,
    padding: "5%",
    fontWeight: "bold",
  },

  img: {
    width: "70%",
    height: "50%",
    margin: "2%",
    borderColor: "black",
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
    backgroundColor: "rgba(120,217,115,255)",
    borderRadius: 10,
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
    justifyContent: "space-between", // Esto distribuye el espacio entre los elementos
  },
});

export default BrigadeProfile_Mobile;
