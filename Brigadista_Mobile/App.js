import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import BrigadeLogin from './components/BrigadeLogin';
import BrigadeProfile_Mobile from './components/BrigadeProfile_Mobile';
import BrigadeScan_Mobile from './components/BrigadeScan_Mobile';
import BrigadeIncident_Mobile from './components/BrigadeIncident_Mobile';
//Navegacion
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator(); // Define el StackNavigator

export default function App() {
  //Variables de estado para almacenar el nombre, apellido y contraseña
  const [nameB, setNameB] = useState("");
  const [mailB, setMailB] = useState("");
  const [lastB, setLastB] = useState("");

  //Metodos 
  const LoadBrig = (name, last ,email)=>{
  setNameB(name);
  setLastB(last);
  setMailB(email);  
  }
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BrigadeLogin" component={BrigadeLogin} options={{title: 'Registro'}}
        initialParams={{LoadBrig}}
        />
        <Stack.Screen name='BrigadeProfile_Mobile' component={BrigadeProfile_Mobile} options={{title: 'Pagina Principal'}}/>
        <Stack.Screen name='BrigadeScan_Mobile' component={BrigadeScan_Mobile} options={{title: 'Scanaeo de Vehículo'}}/>
        <Stack.Screen name='BrigadeIncident_Mobile' component={BrigadeIncident_Mobile} options={{title: 'Envio de Comentarios'}}/>
        
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  img: {
   width: "70%", 
   height: '30%',
   margin: '2%'
  },
  button: {
    alignItems: 'center',
    borderRadius: 5,
    margin: '2%',
    backgroundColor: 'rgba(25,118,210,255)'
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    width: '65%',
    //color: '#rgba(255, 255, 255, 0.8)',
    margin: '2%'
  },
  box:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row', // Esto coloca los elementos en una fila
    alignItems: 'center',  // Esto alinea los elementos verticalmente en el centro
    justifyContent: 'space-between', // Esto distribuye el espacio entre los elementos
  },
  
});
