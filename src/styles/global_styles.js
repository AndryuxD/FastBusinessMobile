import { StyleSheet, Dimensions } from "react-native";

//Variables dimensions
const window = Dimensions.get("window");
export const width = window.width;
export const height = window.height;

export default styles = StyleSheet.create({
  //Style Login
  loginBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    justifyContent: "center",
  },

  logoContainer: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: height / 12,
    marginBottom: -height / 30,
  },

  logo: {
    resizeMode: "contain",
    height: width / 1.2,
  },

  generalContainer: {
    flex: 1,
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: height / 35,
    paddingTop: height / 15,
  },
  generalContainerRegister: {
    flex: 1,
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: height / 35,
    paddingTop: height / 30,
  },

  textInput: {
    flex: 2,
    height: height / 12,
    backgroundColor: "#FFFFFF",
    textAlign: "left",
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    paddingLeft: 19,
    fontSize: width / 21,
    fontWeight: "bold",
  },

  recoverPasswordBtn: {
    borderColor: "#ffffff",
    justifyContent: "flex-end",
    flexDirection: "row",
    height: height / 20,
    paddingTop: height / 160,
  },

  pswText: {
    color: "black",
    fontSize: width / 22,
    textAlign: "right",
    width: "100%",
    fontWeight: "bold",
  },

  loginBtn: {
    backgroundColor: "#3FC060",
    borderRadius: 50,
    justifyContent: "center",
    width: "100%",
    height: height / 12,
    marginTop: height / 10,
  },

  loginBtn2: {
    backgroundColor: "#3FC060",
    borderRadius: 50,
    justifyContent: "center",
    width: "100%",
    height: height / 12,
    marginTop: height / 30,
  },

  loginText: {
    color: "#FFFFFF",
    fontSize: width / 22,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },

  changeViewBtn: {
    borderColor: "#ffffff",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    height: height / 16,
    marginTop: height / 50,
  },

  changeViewText: {
    color: "black",
    fontSize: width / 22,
    textAlign: "center",
    width: "100%",
    paddingTop: 13,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },

  fbLoginBtn: {
    backgroundColor: "#4267b2",
    borderRadius: 50,
    justifyContent: "center",
    width: "100%",
    height: height / 12,
    marginTop: height / 50,
  },

  //Style Register
  logoContainerRegister: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: height / 30,
    marginBottom: -height / 30,
  },

  viewInputIcon: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingLeft: width / 20,
    flex: 0.2,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    justifyContent: "center",
    height: height / 12,
  },

  viewInputIconSecure: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    paddingRight: width / 20,
    flex: 0.2,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: "center",
    height: height / 12,
  },

  viewInputBox: {
    flexDirection: "row",
    justifyContent: "center",
    height: height / 14,
    alignContent: "center",
    marginBottom: height / 25,
  },

  viewInputBox2: {
    flexDirection: "row",
    justifyContent: "center",
    height: window.height / 17,
    alignContent: "center",
  },

  viewInputRegisterBox: {
    flexDirection: "row",
    justifyContent: "center",
    height: height / 14,
    alignContent: "center",
  },

  textInputForPassword: {
    flex: 2,
    height: height / 12,
    backgroundColor: "#FFFFFF",
    textAlign: "left",
    paddingLeft: 22,
    fontSize: width / 21,
    fontWeight: "bold",
  },

  textInputRegister: {
    flex: 2,
    height: height / 20,
    textAlign: "left",
    color: "#6c757d",
    borderBottomColor: "#6c757d",
    borderBottomWidth: 0.5,
    paddingLeft: width / 17,
    fontSize: width / 22,
    opacity: 0.6,
    letterSpacing: -0.16,
  },

  textInputRegisterForPassword: {
    flex: 2,
    height: height / 20,
    textAlign: "left",
    color: "#6c757d",
    borderBottomColor: "#6c757d",
    borderBottomWidth: 0.5,
    paddingLeft: width / 17,
    fontSize: width / 22,
    opacity: 0.6,
  },

  viewInputRegisterIcon: {
    flexDirection: "column",
    paddingLeft: width / 20,
    flex: 0.2,
    borderBottomColor: "#6c757d",
    borderBottomWidth: 0.5,
    justifyContent: "center",
    height: height / 20,
    opacity: 0.6,
  },

  viewInputRegisterIconSecure: {
    flexDirection: "column",
    paddingRight: width / 20,
    flex: 0.2,
    borderBottomColor: "#6c757d",
    borderBottomWidth: 0.5,
    justifyContent: "center",
    height: height / 20,
    opacity: 0.6,
  },

  registerBtn: {
    backgroundColor: "#FFF",
    borderRadius: 50,
    justifyContent: "center",
    width: "100%",
    height: height / 12,
    marginTop: height / 30,
  },

  registerText: {
    color: "black",
    fontSize: width / 22,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },

  viewRecoveryInputBox: {
    flexDirection: "row",
    justifyContent: "center",
    height: height / 6,
    alignContent: "center",
    marginTop: height / 30,
  },

  //Recovery styles
  logoContainerRecovery: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: height / 12,
    marginBottom: height / 30,
  },
});
