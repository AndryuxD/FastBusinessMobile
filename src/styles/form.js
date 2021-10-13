import { StyleSheet } from "react-native";
import colors from "./colors";

const formStyles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
  btnSucces: {
    padding: 5,
    backgroundColor: colors.primary,
  },
  btnText: {
    marginTop: 10,
  },
  btnTextLabel: {
    color: colors.dark,
  },
  btnTextLabelFB: {
    color: colors.white,
    fontSize: 14,
  },
  btnTextFB: {
    marginTop: 12,
    backgroundColor: "#4267b2",
    height: 40,
  },
});

export default formStyles;

/**
 *
import { StyleSheet } from "react-native";
import colors from "./colors";

const formStyles = StyleSheet.create({
    input: {
        marginBottom: 20,
    },
    btnSucess: {
        padding: 5,
        backgroundColor: colors.primary,
    },
    btnText: {
        marginTop: 10,
    },
    btnTextLabel: {
        color: colors.dark,
    },
});

export default formStyles;
 */
