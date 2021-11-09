import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from "react-native-paper";
import colors from "../../styles/colors";

export default function Search() {
    return (
        <View style={styles.container}>
            <Searchbar style={styles.bus} placeholder="Buscar....." />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#79B4B7",
        paddingVertical: 10,
        paddingHorizontal: 20,
        zIndex: 1,
    },
    bus:{
        borderRadius:20,
    }
});