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

export default function ListProduct(props) {
  const { productos } = props;
  const navigation = useNavigation();

  const goToProduct = (id) => {
    //console.log("hola, tu id es:", id);
    navigation.push("product", { idProductos: id });
  };

  return (
    <View style={styles.container}>
      {map(productos, (productos) => (
        <TouchableWithoutFeedback
          key={productos._id}
          onPress={() => goToProduct(productos._id)}
        >
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
                  style={styles.textouwu}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {productos.descripcion}
                </Text>
              </View>
              <Button
                mode="contained"
                style={styles.btn}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {productos.nombre}
              </Button>
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
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    //margin: -3,
  },
  containerProducto: {
    width: "100%",
    padding: 5,
    borderRadius: 10,
  },
  product: {
    //backgroundColor: "",
    backgroundColor: "#DCDCDC",
    padding: 10,
    borderRadius: 6,
  },
  image: {
    height: 170,
    resizeMode: "contain",
    width: 350,
    marginBottom: 15,
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
  textouwu: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 8,
    //textAlign:"stretch",
    //alignItems="stretch"
  },
  contenedor: {
    backgroundColor: "#C0C0C0",
  },
});
