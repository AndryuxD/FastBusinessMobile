import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableHighlight,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import fondouwu from "../../../assets/fondouwu.png";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import * as Yup from "yup";
import { preguntasApi } from "../../api/preguntas";
import { formStyles } from "../../styles";

export default function App(props) {
  // const image = { uri: "https://reactjs.org/logo-og.png" };
  const { changeForm } = props;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        await preguntasApi(formData);
        //changeForm();
        console.log(formData);
        navigation.goBack();
      } catch (error) {
        setLoading(false);
      }
    },
  });

  const preciona = () => {
    //console.log("hola, tu id es:", id);

    Alert.alert(
      "¿Como puedo cambiar de usuario?",
      "Para cambiar el usuario ingresa al apartado de cuenta e ingresa a la seccion de cambiar usuario",
      [
        {
          text: "Cerrar",
          onPress: cerrar,
        },
      ]
    );
  };

  const preciona2 = () => {
    //console.log("hola, tu id es:", id);
    Alert.alert(
      "¿Como puedo actualizar contraseña?",
      "Para cambiar la contraseña ingresa al apartado de cuenta e ingresa a la seccion de cambiar contraseña",
      [
        {
          text: "Cerrar",
          onPress: cerrar,
        },
      ]
    );
  };
  const preciona3 = () => {
    //console.log("hola, tu id es:", id);

    Alert.alert(
      "¿Como subir un proyecto?",
      "accede al área de registrar un proyecto y llene los datos que se le piden",
      [
        {
          text: "Cerrar",
          onPress: cerrar,
        },
      ]
    );
  };

  const preciona4 = () => {
    //console.log("hola, tu id es:", id);
    Alert.alert(
      "¿cambiar de direccion?",
      "Para cambiar direccion ingresa al apartado de cuenta e ingresa a la seccion de cambiar direccion",
      [
        {
          text: "Cerrar",
          onPress: cerrar,
        },
      ]
    );
  };

  const preciona5 = () => {
    //console.log("hola, tu id es:", id);
    Alert.alert(
      "¿Que tipo de proyectos se aceptan?",
      "se aceptan proyectos de todo tipo siempre y cuando sea legal",
      [
        {
          text: "Cerrar",
          onPress: cerrar,
        },
      ]
    );
  };

  const preciona6 = () => {
    //console.log("hola, tu id es:", id);
    Alert.alert(
      "¿como puedo ver el estado de un proyecto?",
      "en el inicio al darle ver descripción podrá ver el estado de su proyecto",
      [
        {
          text: "Cerrar",
          onPress: cerrar,
        },
      ]
    );
  };

  const cerrar = () => {
    //console.log("cerrar");
    //onclose(true);
  };

  const cambio = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.vista}>
      <ImageBackground
        source={fondouwu}
        resizeMode="cover"
        style={styles.image}
      >
        <ScrollView>
          <View style={styles.contenedor}>
            <TouchableHighlight style={styles.btn} onPress={() => preciona()}>
              <Text style={styles.texto}>¿Como puedo cambiar de usuario?</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.btn} onPress={() => preciona2()}>
              <Text style={styles.texto}>
                ¿Como puedo actualizar contraseña?
              </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.btn} onPress={() => preciona3()}>
              <Text style={styles.texto}>¿Como subir un proyecto?</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.btn} onPress={() => preciona4()}>
              <Text style={styles.texto}>¿cambiar de direccion?</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.btn} onPress={() => preciona5()}>
              <Text style={styles.texto}>
                ¿Que tipo de proyectos se aceptan?
              </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.btn} onPress={() => preciona6()}>
              <Text style={styles.texto}>
                ¿como puedo ver el estado de un proyecto?
              </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.product}>
            <Text style={styles.textopregunta}>Sugerir Pregunta</Text>
            <TextInput
              label="Ingrese su duda"
              onChangeText={(text) => formik.setFieldValue("pregunta", text)}
              value={formik.values.pregunta}
              error={formik.errors.pregunta}
            />

            <Text
              onChangeText={(text) => formik.setFieldValue("respuesta", text)}
              value={formik.values.pregunta}
              error={formik.errors.pregunta}
            >
              Para ver la respuesta a su pregunta por favor asiste al area de
              preguntas
            </Text>
            <Button
              mode="contained"
              style={formStyles.btnSucces}
              onPress={formik.handleSubmit}
              loading={loading}
            >
              Enviar
            </Button>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  vista: {
    flex: 1,
  },
  texto: {
    fontSize: 18,
    color: "#ffffff",
  },
  textopregunta: {
    fontWeight: "bold",
    textAlign: "center",
  },
  btn: {
    width: 390,
    height: 50,
    backgroundColor: "#1E90FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 10,

    borderRadius: 8,
    //borderWidth:1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  contenedor: {
    alignItems: "center",
    margin: 20,
  },
  enviar: {
    backgroundColor: "#1E90FF",
    marginTop: 10,
    alignItems: "center",
    color: "#ffffff",
  },
  product: {
    //backgroundColor: "",
    backgroundColor: "#DCDCDC",
    padding: 20,
    borderRadius: 6,

    marginTop: 20,
    marginLeft: 12,
  },
});

function initialValues() {
  return {
    pregunta: "",
    respuesta: "aun no tiene respuesta",
  };
}

function validationSchema() {
  return {
    pregunta: Yup.string().required(true),
  };
}
