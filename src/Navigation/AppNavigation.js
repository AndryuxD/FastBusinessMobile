import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import colors from "../styles/colors";
import AccountStack from "./AccountStack";
import ProductStack from "./ProductStack";
import { Favoritos } from "../Screens/index";
import Registro_pry from "../Components/pry/Registro_pry";
import Donaciones from "../Screens/Donaciones";
import { createDrawerNavigator } from "@react-navigation/drawer";

//import Acounts from "../Screens/Acounts";
//import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
//import Favoritos from "../Screens/Favoritos";
//import Home from "../Screens/Product/Home";

/*const Tab = createMaterialBottomTabNavigator();

export default function AppNavigation() {
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
          name="home"
          component={ProductStack}
          options={{
            title: "Inicio",
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={Registro_pry}
          options={{
            title: "Registro de proyectos",
          }}
        />

        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{
            title: "Mi cuenta",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}*/

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Inicio" component={ProductStack} />
        <Drawer.Screen name="Mi cuenta" component={AccountStack} />
        <Drawer.Screen name="Donaciones" component={Donaciones} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function setIcon(route, routeStatus) {
  let iconName = "";

  switch (route.name) {
    case "home":
      iconName = "home";
      break;
    case "Favorites":
      iconName = "eye";
      break;
    case "cart":
      iconName = "shopping-cart";
      break;
    case "account":
      iconName = "bars";
      break;
    default:
      break;
  }
  return <AwesomeIcon name={iconName} style={styles.icon} />;
}

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: colors.bgDark,
  },
  icon: {
    fontSize: 20,
    color: colors.fontLight,
  },
});
