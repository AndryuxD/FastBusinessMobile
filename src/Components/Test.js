import React from 'react';
import { View, Text } from 'react-native';
import { Button } from "react-native-paper";

export default function Test() {
    return (
        <View>
            <Text>Estamos en prueba.uwu</Text>
            <Button onPress={() => console.log("hola")} mode="contained">hola</Button>
        </View>
    )
}
