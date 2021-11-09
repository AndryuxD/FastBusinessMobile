import React, { useState, useCallback } from "react";
import { Text, View, Image, StyleSheet, Linking, Alert } from "react-native";
import { InAppBrowser } from "react-native-inappbrowser-reborn";
import colors from "../styles/colors";
import { Button } from "react-native-paper";
import Naruto from "../../assets/La_Promesa_de_Naruto.png";

const openLink = async () => {
  try {
    const url = "https://www.google.com";
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(url, {
        // Android Properties
        showTitle: true,
        toolbarColor: "#6200EE",
        secondaryToolbarColor: "black",
        navigationBarColor: "black",
        navigationBarDividerColor: "white",
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
      });
      Alert.alert(JSON.stringify(result));
    } else Linking.openURL(url);
  } catch (error) {
    Alert.alert(error.message);
  }
};

export default function Donaciones() {
  return (
    <View style={styles.container}>
      <View style={styles.blockLine}>
        <Text style={styles.text}>Gracias por tu apoyo!</Text>
        <Text style={styles.text}>Ya casi llegamos a la meta mensual!</Text>
      </View>
      <Image style={styles.logo} source={Naruto} />
      <View style={styles.actions}>
        <Button
          mode="contained"
          color={colors.PP}
          onPress={() => {
            Linking.openURL("https://www.paypal.com/paypalme/AndryuxD");
          }}
          style={styles.button}
        >
          ir a paypal
        </Button>
      </View>
    </View>
  );
}
const donar = () => {
  Linking.openURL("www.google.com");
};
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  address: {
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
  },
  text: {
    paddingBottom: 5,
    fontSize: 18,
  },
  blockLine: {
    justifyContent: "center",
    padding: 20,
  },
  actions: {
    justifyContent: "center",
    marginTop: 30,
  },
  logo: {
    width: "100%",
    height: 265,
    resizeMode: "contain",
    marginBottom: 30,
    marginTop: 30,
  },
  button: {
    margin: 20,
  },
});
