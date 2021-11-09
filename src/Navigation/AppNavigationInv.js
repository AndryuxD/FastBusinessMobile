import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AwsomeIcon from "react-native-vector-icons/FontAwesome";
import colors from "../styles/colors";
import HomeInv from "../Screens/HomeInv";
import AccountStack from "./AccountStack";

const Tab = createMaterialBottomTabNavigator();

export default function AppNavigationInv() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={styles.navigation}
        screenOptions={({ route }) => ({
          tabBarIcon: (routeStatus) => {
            return setIcon(route, routeStatus);
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeInv}
          options={{ tittle: "Inicio" }}
        />
        <Tab.Screen
          name="Account"
          component={AccountStack}
          options={{ tittle: "Mi cuenta" }}
        />
      </Tab.Navigator>
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
