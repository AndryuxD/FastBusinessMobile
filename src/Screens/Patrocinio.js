import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import colors from "../styles/colors";
import { StatusBar } from "../Components/index.js";
//import StatusBar from "../../Components/Search/StatusBar";
//import Search from '../../Components/Search';
import NewProducts from "../Components/Patrocinio/NewProducts";

export default function Patrocinio() {
  return (
    <>
      <StatusBar backgroundcolor={colors.bgDark} barStyle="light-content" />
      <ScrollView style={styles.container}>
        <NewProducts />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "#E6E6FA",
  },
});
