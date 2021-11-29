import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function UserInfo(props) {
  const { user } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>INFORMACION DEL USUARIO</Text>
      <Text style={styles.titleName}>
        Usuario:
        {" " + user.name && user.lastname
          ? " " + `${user.name} ${user.lastname}`
          : " " + user.email}
      </Text>
      <Text style={styles.titleName}>
        Tipo de usuario:
        {" " + user.tipousuario}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
  },
  titleName: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
