import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Icon from "react-native-vector-icons/FontAwesome";
import AccountStack from "./AccountStack";
import ProductStack from "./ProductStack";
import { Favoritos } from "../Screens/index";
import Registro_pry from "../Components/pry/Registro_pry";

const leftIcon = (navigation, icon) => (
  <Icon
    name={icon}
    style={{ marginLeft: 20 }}
    size={20}
    color="#000"
    onPress={() => navigation.openDrawer()}
  />
);

const HomeScreenStack = createStackNavigator({
  Home: {
    screen: ProductStack,
    navigationOptions: ({ navigation }) => ({
      title: "Inicio",
      headerLeft: () => leftIcon(navigation, "bars"),
    }),
  },
});

export default HomeScreenStack;
