import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AwsomeIcon from "react-native-vector-icons/FontAwesome";
import colors from "../styles/colors";
import HomeInv from "../Screens/HomeInv";
import AccountStack from "./AccountStack";
import Donaciones from "../Screens/Donaciones";
import ProductStack from "./ProductStack";
import PatrocinioStack from "./PatrocinioStack";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export default function AppNavigationInv() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Inicio" component={ProductStack} />
        <Drawer.Screen
          name="Mis proyectos patrocinados"
          component={PatrocinioStack}
        />
        <Drawer.Screen name="Mi cuenta" component={AccountStack} />
        <Drawer.Screen name="Donaciones" component={Donaciones} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function setIcon(route, routeStatus) {
  let iconName = "";

  switch (route.name) {
    case "Home":
      iconName = "home";
      break;
    case "Account":
      iconName = "bars";
      break;

    default:
      break;
  }
  return <AwsomeIcon name={iconName} style={styles.icon} />;
}

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: "#A9E4D7",
  },
  icon: {
    fontSize: 23,
    color: colors.fontLight,
  },
});
