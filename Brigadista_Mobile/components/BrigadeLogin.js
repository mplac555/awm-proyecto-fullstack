import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput, Box } from "@react-native-material/core";
import {
  IconComponentProvider,
  Icon,
  Button,
} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";

const BrigadeLogin = ({ navigation }) => {
  //Direccion IP del servidor
  // const host = '192.168.1.48';
  // const host = "localhost";
  const host = "192.168.2.2";
  //Estados para almacenar los valores de entrada
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [eLogin, setELogin] = useState("");

  //Muestra de una alerta
  const showAlert = () => {
    Alert.alert(
      "Error al Iniciar Sessión",
      "El Nombre, Correo o Contraseña Incorrectos",
      [
        {
          text: "Aceptar",
          onPress: () => {
            // Manejar la acción cuando el usuario hace clic en Aceptar
            console.log("Usuario hizo clic en Aceptar");
          },
        },
      ],
      { cancelable: false } // Permite o impide que el usuario cierre la alerta tocando fuera de ella
    );
  };

  //Metodo para consultar
  const StartSession = () => {
    console.log(userName);
    console.log(email);
    console.log(pass);
    //Consulta al backend
    const brigaditaA = {
      brigName: userName,
      brigMail: email,
      brigPassword: pass,
    };

    axios
      .post("http://" + host + ":8000/api/brigadista/login", brigaditaA)
      .then((response) => {
        //Manejo de la promesa si es positiva
        console.log(response.data);
        //Verificar si es nulo
        if (response.data == null) {
          showAlert();
        } else {
          console.log("Brigadista encontrado");
          //Me dirigo al perfil del brigadista y cargo al estado global
          //LoadBrig(response.data.brigName,response.data.brigLastname,response.data.brigMail);
          navigation.navigate("BrigadeProfile_Mobile", {
            userName: userName,
            email: email,
          });
        }
      })
      .catch((err) => {
        console.log("Error en logeo");
      });
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={[
          "rgba(133, 255, 143, 1)",
          "rgba(121, 238, 149, 1)",
          "rgba(8, 87, 198, 1)",
        ]}
        start={{ x: 0, y: 0 }}
        style={styles.background}
      />
      <Image style={styles.img} source={require("../assets/portada.png")} />

      <Box w={"100%"} style={styles.box}>
        <View style={styles.inputContainer}>
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Icon name="account" size={40} color="white"></Icon>
          </IconComponentProvider>

          <TextInput
            variant="outlined"
            label="Nombre de Usuario"
            style={styles.text}
            onChangeText={(e) => setUserName(e)}
          />
        </View>
      </Box>

      <Box w={"100%"} style={styles.box}>
        <View style={styles.inputContainer}>
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Icon name="email-outline" size={40} color="white"></Icon>
          </IconComponentProvider>
          <TextInput
            variant="outlined"
            label="Correo electrónico"
            style={styles.text}
            onChangeText={(e) => setEmail(e)}
          />
        </View>
      </Box>

      <Box w={"100%"} style={styles.box}>
        <View style={styles.inputContainer}>
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Icon name="lock" size={40} color="white"></Icon>
          </IconComponentProvider>
          <TextInput
            variant="outlined"
            label="Contraseña"
            style={styles.text}
            onChangeText={(e) => setPassword(e)}
          />
        </View>
      </Box>
      <Button
        title="Iniciar Sesión"
        style={styles.button}
        onPress={StartSession}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: 'orange',
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  img: {
    width: "70%",
    height: "30%",
    margin: "2%",
  },
  button: {
    alignItems: "center",
    borderRadius: 5,
    margin: "2%",
    backgroundColor: "rgba(25,118,210,255)",
  },
  text: {
    backgroundColor: "transparent",
    fontSize: 15,
    width: "65%",
    //color: '#rgba(255, 255, 255, 0.8)',
    margin: "2%",
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row", // Esto coloca los elementos en una fila
    alignItems: "center", // Esto alinea los elementos verticalmente en el centro
    justifyContent: "space-between", // Esto distribuye el espacio entre los elementos
  },
});

export default BrigadeLogin;
