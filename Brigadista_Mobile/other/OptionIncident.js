import React, { useMemo, useState } from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TextInput, Box } from "@react-native-material/core";

export default function OptionIncident({onType, onPlaca,onDescription,ontypeOther}) {

    const radioButtons = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Suplatanción: (Codigo QR no coincide)',
            value: 'Suplantacion',
            
        },
        {
            id: '2',
            label: 'Intruso: No contiene código QR',
            value: 'Intruso'
        },
        {
            id: '3',
            label: 'Otro:',
            value: 'Otro'
        }
    ]), []);

    const [selectedId, setSelectedId] = useState();
    const [incidentDescription, setIncidentDescription] = useState('');
    const [plateNumber, setPlateNumber] = useState('');
    const [details, setDetails] = useState('');

    const handleRadioButtonChange = (value) => {
        setSelectedId(value);
        onType(value);
      };
    
      const handleIncidentDescriptionChange = (text) => {
        setIncidentDescription(text);
        ontypeOther(text);
      };
    
      const handlePlateNumberChange = (text) => {
        setPlateNumber(text);
        onPlaca(text);
      };
    
      const handleDetailsChange = (text) => {
        setDetails(text);
        onDescription(text);
      };

    return (
        <View>
            <RadioGroup 
            radioButtons={radioButtons} 
            onPress={handleRadioButtonChange}
            selectedId={selectedId}
            
            />
            
                {selectedId == 3 ?(
                    <Box w={'100%'} style={styles.box}>

                      <TextInput variant="outlined" label="Especifique el Incidente" style={styles.text}
                      onChangeText={handleIncidentDescriptionChange}
                      value= {incidentDescription}
                      />
                  </Box>
                ):(
                    <Text style={styles.text}>
                        {selectedId}
                    </Text>
                )}
                 
                 <Box w={'100%'} style={styles.box}>
                      <Text style={styles.text}>Descripción del Incidente:</Text>
                      <TextInput variant="outlined" label="Número de Placa" style={styles.text}
                      onChangeText={handlePlateNumberChange}
                      value={plateNumber}
                      />
                      <TextInput variant="outlined" label="Detalles (Opcional)" style={styles.text} 
                      onChangeText={handleDetailsChange}
                      value={details}
                      />
                      
                </Box>
        </View>
    );

}

const styles = StyleSheet.create({
    box:{
        alignItems: 'center',
    },
    text: {
        backgroundColor: 'transparent',
        fontSize: 25,
        width: '90%',
        fontFamily: 'sans-serif',
        margin: '2%',
        textAlign: 'center',
        
      },
})

