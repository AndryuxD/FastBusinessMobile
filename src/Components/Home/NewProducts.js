import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { getLastProductsApi } from "../../api/product";
import ListProduct from "./ListProduct";
//import { ListProduct } from '../../Components/index';

export default function NewProducts() {
  const [productos, setProductos] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getLastProductsApi();
      setProductos(response);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
        <Text style={styles.title}>CATALOGO DE PROYECTOS</Text>
      </View>
      {productos && <ListProduct productos={productos} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
    color: "#ffffff",
    padding: 5,
  },
  titulo: {
    backgroundColor: "#4169E1",
    borderRadius: 5,
  },
});
