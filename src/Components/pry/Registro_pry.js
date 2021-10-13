import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Platform, ToastAndroid } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { registerApi, registerImgApi } from "../../api/product";
import { formStyles } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { IMG_URL } from "../../utils/Constants";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        await registerApi(formData);
        setLoading(false);
        Toast.show("Registro exitoso", {
          position: Toast.positions.CENTER,
        });
      } catch (error) {
        setLoading(false);
        Toast.show("!Ups¡ algo salio mal...", {
          position: Toast.positions.CENTER,
        });
      }
    },
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.6,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  uploadImage = async () => {
    let localUri = image;
    if (localUri == null || localUri == "") {
      ToastAndroid.showWithGravity(
        "Debe seleccionar una imágen",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      let filename = localUri.split("/").pop();

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      let nameProject = formik.values.nombre;
      let formData = new FormData();
      formData.append("photo", {
        uri: localUri,
        name: nameProject,
        type,
      });
      let arrayxd = type.split("/");
      let tipo = arrayxd[1];
      let vchimagenxd = nameProject + "." + tipo;
      formik.setFieldValue("vchimagen", vchimagenxd);
      await fetch(`${IMG_URL}`, {
        method: "POST",
        body: formData,
        header: {
          "content-type": "multipart/form-data",
        },
      });
    }
  };
  return (
    <View>
      <Text style={styles.texto}>REGISTRO DE PROYECTOS</Text>

      <TextInput
        label="Nombre del Emprendor:"
        style={formStyles.input}
        onChangeText={(text) => formik.setFieldValue("emprendedor", text)}
        value={formik.values.emprendedor}
        error={formik.errors.emprendedor}
      />
      <TextInput
        label="Nombre del Proyecto: "
        style={formStyles.input}
        onChangeText={(text) => formik.setFieldValue("nombre", text)}
        value={formik.values.nombre}
        error={formik.errors.nombre}
        //right={<TextInput.Affix text="/10" />}
      />
      <TextInput
        label="Descripcion del proyecto"
        style={formStyles.input} //secureTextEntry
        onChangeText={(text) => formik.setFieldValue("descripcion", text)}
        value={formik.values.descripcion}
        error={formik.errors.descripcion}
      />
      <TextInput
        label="Nombre de la Empresa:"
        style={formStyles.input} //secureTextEntry
        onChangeText={(text) => formik.setFieldValue("empresa", text)}
        value={formik.values.empresa}
        error={formik.errors.empresa}
      />

      <Button
        mode="contained"
        onPress={pickImage}
        style={[formStyles.btnText, { marginBottom: 15, padding: 5 }]}
      >
        seleccionar Imagen
      </Button>

      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}

      <Button
        mode="contained"
        style={formStyles.btnSucces}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Registrar proyecto
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    emprendedor: "",
    nombre: "",
    descripcion: "",
    empresa: "",
  };
}

function validationSchema() {
  return {
    emprendedor: Yup.string().required(true),
    nombre: Yup.string().required(true),
    descripcion: Yup.string().required(true),
    //empresa: Yup.string().required(true).oneOf([Yup.ref("password")], true),
    empresa: Yup.string().required(true),
  };
}

/**
 * <TextInput label="Imagen:" 
            style={formStyles.input} //secureTextEntry 
            onChangeText={(text) => formik.setFieldValue("Imagen",text)} 
            value={formik.values.Imagen}
             error={formik.errors.Imagen}
            />
 */

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 95,
    resizeMode: "contain",
    marginBottom: 20,
  },
  texto: {
    textAlign: "center",
    fontSize: 22,
    marginBottom: 15,
    padding: 20,
    fontWeight: "bold",
  },
});
