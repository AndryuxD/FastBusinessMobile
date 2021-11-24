import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
} from "react-native";
import RegisterForm from "../Components/Auth/RegisterForm";
import LoginForm from "../Components/Auth/LoginForm";
import logo from "../../assets/FBICON.jpeg";
import { layoutStyle } from "../styles";
import global_styles from "../styles/global_styles";
import backgroundLogin from "../../assets/backgroundLogin.png";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);
  const changeForm = () => setShowLogin(!showLogin);

  return (
    <ImageBackground
      style={global_styles.loginBackground}
      source={backgroundLogin}
    >
      <ScrollView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <Image style={styles.logo} source={logo} />
        {showLogin ? (
          <LoginForm changeForm={changeForm} />
        ) : (
          <RegisterForm changeForm={changeForm} />
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
    marginTop: 80,
  },
});
