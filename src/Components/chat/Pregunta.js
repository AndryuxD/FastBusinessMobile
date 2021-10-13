import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { size } from "lodash";

export default function Order(props) {
  const { order } = props;

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
      <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
          {order.pregunta}
        </Text>
      </View>

        

      <View style={styles.info}>

      
        <Text style={styles.informacion}>fecha: {order.createdAt}</Text>
        {!order.respuesta ? (
           <Text>Sin respuesta</Text>
        ) : size(order) === 0 ? (
            <Text style={styles.informacion}>Respuesta: {order.respuesta}</Text>
        ) : (
            <Text style={styles.informacion}>Respuesta: {order.respuesta}</Text>
        )}


       
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: -20,
    paddingVertical: 5,
    flexDirection: "row",
  },
  containerImage: {
    width: "30%",
    height: 120,
    padding: 20,
  },
  image: {
    height: "100%",
    resizeMode: "contain",
  },
  info: {
    width: "70%",
    justifyContent: "center",
  },

  informacion:{
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
