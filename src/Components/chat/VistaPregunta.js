import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { map } from "lodash";
import Pregunta from "./Pregunta";

export default function ListOrder(props) {
  const { orders } = props;
    console.log(orders);
  return (
    <View style={styles.container}>
      {map(orders, (order) => (
        <Pregunta key={order._id} order={order} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 40,
  },
});
