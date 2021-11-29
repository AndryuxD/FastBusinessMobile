import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { map } from "lodash";
import { Button } from "react-native-paper";
import { API_URL } from "../../utils/Constants";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ListProduct(props) {
  const { productos } = props;
  const navigation = useNavigation();

  const goToProduct = (id) => {
    //console.log("hola, tu id es:", id);
    navigation.push("product", { idProductos: id });
  };
  function porcentaje(meta, actual) {
    return (actual * 100) / meta;
  }
  return (
    <View style={styles.container}>
      {map(productos, (productos) => (
        <TouchableWithoutFeedback key={productos._id}>
          <View style={styles.containerProducto}>
            <View style={styles.product}>
              <Image
                source={{
                  uri: `${API_URL}${productos.imagen.url}`,
                }}
                style={styles.image}
              />
              <View>
                <Text
                  style={styles.title}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {productos.nombre}
                </Text>
                <View style={styles.line}></View>
                <View style={styles.caracteristicas}>
                  <Text style={styles.financiado}>
                    {porcentaje(productos.precio, productos.financiado)} %
                    financiado
                  </Text>
                </View>
                <View style={styles.categories}>
                  <Icon style={{ color: "#B9B9B9" }} size={18} name="tag" />
                  <Text style={styles.categoria}>{productos.categoria}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //margin: -3,
  },
  containerProducto: {
    width: "100%",
    marginTop: 20,
  },
  product: {
    borderWidth: 1,
    borderColor: "#DCDCDC",
    padding: 10,
  },
  image: {
    height: 200,
    resizeMode: "stretch",
    width: "100%",
    //marginBottom: 15,
  },
  name: {
    marginTop: 15,
    fontSize: 18,
    marginBottom: 8,
    padding: 10,
    //textAlign:"center",
    backgroundColor: "#2B53C1",
  },
  btn: {
    marginBottom: 20,
    //padding: 15,
    padding: 8,
    backgroundColor: "#2B53C1",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,

    //textAlign:"stretch",
    //alignItems="stretch"
  },
  contenedor: {
    backgroundColor: "#C0C0C0",
  },
  line: {
    borderTopWidth: 2,
    borderColor: "#4169E1",
  },

  caracteristicas: { flexDirection: "row", marginTop: 10 },

  categories: { flexDirection: "row", marginTop: 5 },

  categoria: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
    color: "#B9B9B9",
  },

  financiado: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#B9B9B9",
  },
});
