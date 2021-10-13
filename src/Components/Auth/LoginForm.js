import React, { useState } from "react";
import { View, Text, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Toast from "react-native-root-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as Facebook from "expo-facebook";
import useAuth from "../../hooks/useAuth";
import { loginApi, registerApi } from "../../api/user";
import { formStyles } from "../../styles";

export default function LoginForm(props) {
  const { changeForm } = props;
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      //para que el usuario cuando ejecute, inicie con un true
      setLoading(true);
      try {
        const response = await loginApi(formData);
        // if(response.statusCode) throw "error en el usuario o pswd";
        if (response.statusCode) throw "error en el usuario o contraseña";
        login(response);
      } catch (error) {
        Toast.show(error, {
          position: Toast.positions.CENTER,
        });
        //kkjsksk
        setLoading(false);
      }
    },
  });

  async function logInFB() {
    try {
      await Facebook.initializeAsync({
        appId: "235374181504001",
      });
      const {
        type,
        token,
        email,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`
        );
        const result = await response.json();

        //Definimos el FormData para el registro
        let i = result.name.indexOf(" ");
        let name = result.name.substring(0, i);
        let lastname = result.name.substring(i + 1);
        let FormData = {
          email: result.email,
          lastname: lastname,
          name: name,
          password: result.id,
          repeatPassword: result.id,
          username: name + "FbAccount",
          tipousuario: "emprendedor",
        };

        //Se hace el registro
        const responseR = await registerApi(FormData);
        FormData = {
          identifier: name + "FbAccount", //FbAccount
          password: result.id,
        };
        if (responseR == null) {
          ToastAndroid.showWithGravity(
            "Error Registro",
            ToastAndroid.LONG,
            ToastAndroid.CENTER
          );
        } else if (responseR.statusCode) {
          const responseN = await loginApi(FormData);
          if (responseN == null) {
            throw "Email en uso, por favor escoge otro";
          } else {
            if (responseN.statusCode) {
              throw "Error en el login";
            } else {
              //setUser(responseN.user.tipousuario);
              login(responseN);
              ToastAndroid.showWithGravity(
                `Logged in ! , Hi ${result.name}!`,
                ToastAndroid.LONG,
                ToastAndroid.CENTER
              );
            }
          }
        } else {
          const responseN = await loginApi(FormData);
          login(responseN);
          Alert.alert(
            "Usuario de Facebook",
            "Se ha creado un usuario con tu sesion de Facebook, si quieres que seguir accediendo de esta forma entonces no realices cambios en Username y Password",
            [
              {
                text: "OK, entiendo",
              },
            ],
            { cancelable: false }
          );
        }
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      ToastAndroid.showWithGravity(
        `Facebook Login Error: ${message}`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  }
  //returna el formulario de login.
  return (
    <View>
      <TextInput
        label="Email o User Name"
        style={formStyles.input}
        onChangeText={(text) => formik.setFieldValue("identifier", text)}
        value={formik.values.identifier}
        error={formik.errors.identifier}
      />
      <TextInput
        label="Password"
        style={formStyles.input}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        value={formik.values.password}
        error={formik.errors.password}
        secureTextEntry
      />

      <Button
        mode="contained"
        style={formStyles.btnSucces}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Iniciar sesion
      </Button>
      <Button
        mode="text"
        style={formStyles.btnText}
        labelStyle={formStyles.btnTextLabel}
        onPress={changeForm}
      >
        Registrarse
      </Button>
      <Button
        mode="contained"
        style={formStyles.btnTextFB}
        labelStyle={formStyles.btnTextLabelFB}
        onPress={logInFB}
      >
        Connect with Facebook
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    identifier: "",
    password: "",
  };
}

function validationSchema() {
  return {
    identifier: Yup.string().required(true),
    password: Yup.string().required(true),
  };
}
