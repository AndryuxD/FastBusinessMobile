import React, { useState } from "react";
import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { size } from "lodash";
import { formStyles } from "../styles/form";
import colors from "../styles/colors";
import { STRIPE_PUBLISHABLE_KEY } from "../utils/Constants";
import { paymentCartApi } from "../api/cart";
import useAuth from "../hooks/useAuth";
import Icon from "react-native-vector-icons/FontAwesome";
const stripe = require("stripe-client")(STRIPE_PUBLISHABLE_KEY);
import { getProductApi } from "../api/product";

export default function Payment(props) {
  const navigator = useNavigation();
  const { auth } = useAuth();
  const { products, totalPayment, setModal } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      const result = await stripe.createToken({ card: formData });
      setLoading(true);
      if (result?.error) {
        ToastAndroid.showWithGravity(
          result.error.message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setLoading(false);
      } else {
        const response = await paymentCartApi(
          auth,
          result.id,
          products,
          totalPayment
        );
        if (size(response) > 0) {
          ToastAndroid.showWithGravity(
            "simon",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          setLoading(false);
          navigator.navigate("Mis proyectos patrocinados");
        } else {
          ToastAndroid.showWithGravity(
            "Error al realizar el pedido",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          setLoading(false);
        }
      }
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.containerTitle}>Forma de pago</Text>
        <Icon
          style={styles.icon}
          size={28}
          name="close"
          onPress={() => setModal(false)}
        />
      </View>
      <TextInput
        label="Nombre del propietario"
        onChangeText={(text) => formik.setFieldValue("name", text)}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <TextInput
        label="Numero de la tarjeta"
        onChangeText={(text) => formik.setFieldValue("number", text)}
        value={formik.values.number}
        error={formik.errors.number}
        keyboardType="numeric"
      />
      <View style={styles.containerInputs}>
        <View style={styles.containerMonthYearsInputs}>
          <TextInput
            label="Mes"
            style={styles.inputDate}
            onChangeText={(text) => formik.setFieldValue("exp_month", text)}
            value={formik.values.exp_month}
            error={formik.errors.exp_month}
            keyboardType="numeric"
          />
          <TextInput
            label="Year"
            style={styles.inputDate}
            onChangeText={(text) => formik.setFieldValue("exp_year", text)}
            value={formik.values.exp_year}
            error={formik.errors.exp_year}
            keyboardType="numeric"
          />
        </View>
        <TextInput
          label="CVV/CVC"
          style={styles.inputCVC}
          onChangeText={(text) => formik.setFieldValue("cvc", text)}
          value={formik.values.cvc}
          error={formik.errors.cvc}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.btnContainer}>
        <Button
          mode="contained"
          contentStyle={styles.btnContent}
          labelStyle={styles.btnText}
          onPress={!loading && formik.handleSubmit}
          loading={loading}
        >
          Pagar {totalPayment && `($ ${totalPayment})`}
        </Button>
      </View>
    </View>
  );
}
function initialValues() {
  return {
    number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
    name: "",
  };
}
function validationSchema() {
  return {
    number: Yup.string().min(16, true).max(16, true).required(true),
    exp_month: Yup.string().min(2, true).max(2, true).required(true),
    exp_year: Yup.string().min(2, true).max(2, true).required(true),
    cvc: Yup.string().min(3, true).max(3, true).required(true),
    name: Yup.string().min(4, true).required(true),
  };
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 40,
    marginBottom: 30,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    color: "#000000",
    justifyContent: "flex-start",
    marginTop: 15,
    marginRight: 5,
  },
  containerTitle: {
    paddingBottom: 20,
    marginTop: 20,
    fontSize: 22,
    fontWeight: "bold",
  },
  containerInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  containerMonthYearsInputs: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  inputDate: {
    width: 100,
    marginRight: 10,
  },
  inputCVC: {
    width: "40%",
  },
  btnContainer: {
    marginBottom: 15,
  },
  btnContent: {
    paddingVertical: 4,
    backgroundColor: colors.primary,
  },
  btnText: {
    fontSize: 16,
  },
});
