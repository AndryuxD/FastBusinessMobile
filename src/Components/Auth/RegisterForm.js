import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import { registerApi } from "../../api/user";
import { formStyles } from "../../styles";
import styles from "../../styles/global_styles";
import Icon from "react-native-vector-icons/Feather";
import Icon2 from "react-native-vector-icons/Ionicons";

export default function RegisterForm(props) {
  const { changeForm } = props;
  const [loading, setLoading] = useState(false);
  const [secure, setSecure] = useState(true);
  const [secure2, setSecure2] = useState(true);

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
    <View style={styles.generalContainerRegister}>
      <View style={styles.viewInputRegisterBox}>
        <View style={styles.viewInputRegisterIcon}>
          <Icon style={{ color: "#B9B9B9" }} size={26} name="user" />
        </View>
        <TextInput
          style={styles.textInputRegister}
          placeholder="Nombre"
          onChangeText={(text) => formik.setFieldValue("name", text)}
          value={formik.values.name}
          error={formik.errors.name}
        />
      </View>

      <View style={styles.viewInputRegisterBox}>
        <View style={styles.viewInputRegisterIcon}>
          <Icon style={{ color: "#B9B9B9" }} size={26} name="user" />
        </View>
        <TextInput
          style={styles.textInputRegister}
          placeholder="Apellido"
          onChangeText={(text) => formik.setFieldValue("lastname", text)}
          value={formik.values.lastname}
          error={formik.errors.lastname}
        />
      </View>

      <View style={styles.viewInputRegisterBox}>
        <View style={styles.viewInputRegisterIcon}>
          <Icon style={{ color: "#B9B9B9" }} size={26} name="user" />
        </View>
        <TextInput
          style={styles.textInputRegister}
          placeholder="Usuario"
          onChangeText={(text) => formik.setFieldValue("username", text)}
          value={formik.values.username}
          error={formik.errors.username}
        />
      </View>

      <View style={styles.viewInputRegisterBox}>
        <View style={styles.viewInputRegisterIcon}>
          <Icon style={{ color: "#B9B9B9" }} size={26} name="mail" />
        </View>
        <TextInput
          style={styles.textInputRegister}
          placeholder="E-mail"
          onChangeText={(text) => formik.setFieldValue("email", text)}
          value={formik.values.email}
          error={formik.errors.email}
        />
      </View>

      <View style={styles.viewInputRegisterBox}>
        <View style={styles.viewInputRegisterIcon}>
          <Icon style={{ color: "#B9B9B9" }} size={26} name="lock" />
        </View>
        <TextInput
          style={styles.textInputRegisterForPassword}
          placeholder="Password"
          secureTextEntry={secure}
          onChangeText={(text) => formik.setFieldValue("password", text)}
          value={formik.values.password}
          error={formik.errors.password}
        />
        <View style={styles.viewInputRegisterIconSecure}>
          {formik.values.password ? (
            <Icon
              style={{ color: "#B9B9B9" }}
              size={25}
              name="eye"
              onPress={() => setSecure(!secure)}
            />
          ) : (
            <></>
          )}
        </View>
      </View>

      <View style={styles.viewInputRegisterBox}>
        <View style={styles.viewInputRegisterIcon}>
          <Icon style={{ color: "#B9B9B9" }} size={26} name="lock" />
        </View>
        <TextInput
          style={styles.textInputRegisterForPassword}
          placeholder="Repeat password"
          secureTextEntry={secure2}
          onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
          value={formik.values.repeatPassword}
          error={formik.errors.repeatPassword}
        />
        <View style={styles.viewInputRegisterIconSecure}>
          {formik.values.repeatPassword ? (
            <Icon
              style={{ color: "#B9B9B9" }}
              size={25}
              name="eye"
              onPress={() => setSecure2(!secure2)}
            />
          ) : (
            <></>
          )}
        </View>
      </View>

      <View style={styles.viewInputRegisterBox}>
        <View style={styles.viewInputRegisterIcon}>
          <Icon2 style={{ color: "#B9B9B9" }} size={26} name="business" />
        </View>
        <TextInput
          style={styles.textInputRegister}
          placeholder="Empresa"
          onChangeText={(text) => formik.setFieldValue("empresa", text)}
          value={formik.values.empresa}
          error={formik.errors.empresa}
        />
      </View>

      <View style={styles.viewInputRegisterBox}>
        <View style={styles.viewInputRegisterIcon}>
          <Icon2 style={{ color: "#B9B9B9" }} size={26} name="business" />
        </View>
        <TextInput
          style={styles.textInputRegister}
          placeholder="RFC"
          onChangeText={(text) => formik.setFieldValue("rfc", text)}
          value={formik.values.rfc}
          error={formik.errors.rfc}
        />
      </View>

      <View style={styles.viewInputRegisterBox}>
        <View style={styles.viewInputRegisterIcon}>
          <Icon2 style={{ color: "#B9B9B9" }} size={26} name="card" />
        </View>
        <TextInput
          style={styles.textInputRegister}
          placeholder="CLABE interbancaria"
          onChangeText={(text) => formik.setFieldValue("clabe", text)}
          value={formik.values.clabe}
          error={formik.errors.clabe}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity
        style={styles.loginBtn2}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        <Text style={styles.loginText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.changeViewBtn} onPress={changeForm}>
        <Text style={styles.changeViewText}>Iniciar sesion</Text>
      </TouchableOpacity>
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
