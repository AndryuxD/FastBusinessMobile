import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { registerApi } from "../../api/user";
import { formStyles } from "../../styles";

export default function RegisterForm(props) {
  const { changeForm } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      try {
        await registerApi(formData);
        changeForm();
        Toast.show("Registrado correctamente", {
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

  return (
    <View>
      <TextInput
        label="Name"
        style={formStyles.input}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <TextInput
        label="Last Name"
        style={formStyles.input}
        onChangeText={(text) => formik.setFieldValue("lastname", text)}
        value={formik.values.lastname}
        error={formik.errors.lastname}
      />
      <TextInput
        label="User Name"
        style={formStyles.input}
        onChangeText={(text) => formik.setFieldValue("username", text)}
        value={formik.values.username}
        error={formik.errors.username}
      />
      <TextInput
        label="Email"
        style={formStyles.input}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <TextInput
        label="Password"
        style={formStyles.input}
        secureTextEntry
        onChangeText={(text) => formik.setFieldValue("password", text)}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <TextInput
        label="Repeat password"
        style={formStyles.input}
        secureTextEntry
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        value={formik.values.repeatPassword}
        error={formik.errors.repeatPassword}
      />
      <TextInput
        label="Empresa"
        style={formStyles.input}
        onChangeText={(text) => formik.setFieldValue("empresa", text)}
        value={formik.values.empresa}
        error={formik.errors.empresa}
      />
      <TextInput
        label="RFC"
        style={formStyles.input}
        onChangeText={(text) => formik.setFieldValue("rfc", text)}
        value={formik.values.rfc}
        error={formik.errors.rfc}
      />
      <TextInput
        label="CLABE interbancaria"
        style={formStyles.input}
        onChangeText={(text) => formik.setFieldValue("clabe", text)}
        value={formik.values.clabe}
        error={formik.errors.clabe}
        keyboardType="numeric"
      />
      <Button
        mode="contained"
        style={formStyles.btnSucces}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Registrarse
      </Button>

      <Button
        mode="text"
        style={formStyles.btnText}
        labelStyle={formStyles.btnTextLabel}
        onPress={changeForm}
      >
        Logín
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    empresa: "",
    rfc: "",
    clabe: "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
    repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], true),
    empresa: Yup.string().required(true),
    rfc: Yup.string().required(true),
    clabe: Yup.string().min(18).max(18).required(true),
  };
}
