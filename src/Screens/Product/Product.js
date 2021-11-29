import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  ToastAndroid,
  Modal,
  Pressable,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import colors from "../../styles/colors";
import { getProductApi } from "../../api/product";
import { Button } from "react-native-paper";
import { API_URL } from "../../utils/Constants";
import {
  CarouselImages,
  StatusBar,
  Search,
  ScreenLoading,
} from "../../Components/index";
import imgLogin from "../../../assets/login.jpg";
import Icon from "react-native-vector-icons/FontAwesome";
import useAuth from "../../hooks/useAuth";
import { getMeApi } from "../../api/user";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFormik } from "formik";
import * as Yup from "yup";
import Payment from "../Payment";
//import StatusBar from "../../Components/Search/StatusBar";
//import Search from "../../Components/Search"
//import CarouselImages from "../../Components/Product/CarouselImages";
//import ScreenLoading from "../../Components/Search/ScreenLoading";

export default function product(props) {
  const { route } = props;
  const { params } = route;

  const [productos, setProductos] = useState(null);

  const [user, setUser] = useState(null);
  const { auth } = useAuth();

  const [modal, setModal] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      try {
        await registerApi(formData);
        ToastAndroid.showWithGravity(
          "Registrado correctamente",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      } catch (error) {
        setLoading(false);
        ToastAndroid.showWithGravity(
          "!Ups¡ algo salio mal...",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    },
  });

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setUser(null);
        const response = await getMeApi(auth.token);
        setUser(response);
        formik.setFieldValue("user", response._id);
      })();
    }, [])
  );

  function porcentaje(meta, actual) {
    return (actual * 100) / meta;
  }
  /*function getMoney(amount) {
    const string ="";
    const i =0;
    const array = string.split();
    while (array){
      a
    }
  }*/

  useEffect(() => {
    (async () => {
      const response = await getProductApi(params.idProductos);
      setProductos(response);
      formik.setFieldValue("product", params.idProductos);
    })();
  }, [params]);

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barstyle="light-content" />
      {!productos ? (
        <ScreenLoading
          text="Cargando la informacion del proyecto..."
          size="large"
        />
      ) : (
        <ScrollView style={styles.container}>
          <Modal animationType="slide" transparent={true} visible={modal}>
            <Payment
              products={productos}
              totalPayment={formik.values.cantidad}
              setModal={setModal}
            />
          </Modal>
          <Image
            source={{
              uri: `${API_URL}${productos.imagen.url}`,
            }}
            style={styles.image}
          />
          <Text style={styles.titleDes}> {productos.nombre} </Text>
          <View style={styles.userinfo}>
            <Image source={imgLogin} style={styles.login} />
            <View>
              <Text style={styles.creadoPor}>Creado por</Text>
              <View style={styles.userinfo}>
                <Text style={styles.empresaUI}>{productos.empresa} </Text>
                <Text style={styles.nombreUI}>
                  ({productos.user.name + " " + productos.user.lastname})
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.descripcionView}>
            <Text style={styles.descripcion}>{productos.descripcion}</Text>
          </View>
          <View style={styles.categories}>
            <Icon style={{ color: "#000000" }} size={16} name="tag" />
            <Text style={styles.categoria}>{productos.categoria}</Text>
          </View>
          <View style={styles.line}></View>

          <View style={{ flexDirection: "row" }}>
            <View>
              <View style={styles.financiadoView}>
                <Text style={styles.financiado}>
                  MX $ {productos.financiado}
                </Text>
                <Text style={styles.financiado2}>
                  de MX $ {productos.precio}
                </Text>
              </View>

              <View style={styles.caracteristicas}>
                <Text style={styles.financiado3}>
                  {porcentaje(productos.precio, productos.financiado)} %
                  financiado
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.financiamiento_container}>
            <View style={styles.viewInputRegisterIcon}>
              <Icon style={{ color: "#000000" }} size={26} name="usd" />
            </View>
            <TextInput
              style={styles.textInputRegister}
              placeholder="Cantitad a financiar"
              onChangeText={(text) => formik.setFieldValue("cantidad", text)}
              value={formik.values.cantidad}
              error={formik.errors.cantidad}
              keyboardType="numeric"
            />
          </View>

          {user ? (
            user.tipousuario === "inversionista" ? (
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => setModal(!modal)}
              >
                <Text style={styles.loginText}>Patrocinar este proyecto</Text>
              </TouchableOpacity>
            ) : (
              <Text> </Text>
            )
          ) : (
            <Text> </Text>
          )}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingBottom: 50,
  },

  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
    padding: 25,
    alignItems: "flex-start",
  },

  titleDes: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: -20,
    marginLeft: 10,
    marginBottom: 15,
    textAlign: "left",
  },
  creadoPor: {
    fontSize: 13,
  },
  empresaUI: {
    fontSize: 16,
    fontWeight: "bold",
  },
  nombreUI: {
    fontSize: 15,
    fontWeight: "bold",
  },

  containervista: {
    padding: 10,
  },

  titles: {
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 3,
    padding: 10,
    //alignItems:"flex-start",
    backgroundColor: "#2B53C1",
  },

  btn: {
    marginBottom: 12,
    padding: 15,
    padding: 8,
    backgroundColor: "#2B53C1",
  },

  btnuwu: {
    alignItems: "flex-end",
  },

  imagenesC: {
    marginBottom: 2,
    padding: 5,
  },

  image: {
    height: 350,
    resizeMode: "contain",
    width: "100%",
    //marginBottom: 15,
  },

  login: {
    height: 50,
    resizeMode: "contain",
    width: "20%",
    //marginBottom: 15,
  },

  userinfo: { flexDirection: "row" },

  categories: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 18,
  },

  categoria: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
    color: "#000000",
  },

  descripcionView: {
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 12,
  },

  descripcion: {
    fontSize: 14,
    marginLeft: 5,
    color: "#000000",
  },

  line: {
    borderTopWidth: 2,
    borderColor: "#4169E1",
    margin: 15,
  },

  financiadoView: {
    marginLeft: 15,
    marginTop: 10,
  },

  financiado: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000",
  },

  financiado2: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000000",
  },

  caracteristicas: {
    flexDirection: "row",
    marginLeft: 15,
    marginTop: 10,
  },

  financiado3: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000",
  },

  loginBtn: {
    backgroundColor: "#3FC060",
    borderRadius: 50,
    alignSelf: "center",
    justifyContent: "center",
    width: "95%",
    height: 50,
    marginTop: 30,
    marginBottom: 30,
  },

  loginText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  financiamiento_container: {
    flexDirection: "row",
    justifyContent: "center",
    height: 50,
    alignContent: "center",
    marginTop: 20,
  },

  viewInputRegisterIcon: {
    paddingLeft: 50,
    flex: 0.2,
    borderBottomColor: "#6c757d",
    borderBottomWidth: 0.5,
    justifyContent: "center",
    marginLeft: 50,
    height: 50,
    opacity: 0.6,
  },

  textInputRegister: {
    flex: 2,
    height: 50,
    textAlign: "left",
    color: "#6c757d",
    borderBottomColor: "#6c757d",
    borderBottomWidth: 0.5,
    marginRight: 50,
    paddingLeft: 30,
    fontSize: 18,
    opacity: 0.6,
    letterSpacing: -0.16,
  },
});

function initialValues() {
  return {
    cantidad: "",
    user: "",
    product: "",
  };
}

function validationSchema() {
  return {
    cantidad: Yup.string().required(true),
  };
}
