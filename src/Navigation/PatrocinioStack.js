import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import colors from "../styles/colors";
import proyectos_Patrocinados from "../Screens/Patrocinio";

const Stack = createStackNavigator();

export default function PatrocinioStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.fontLight,
        headerStyle: { backgroundColor: colors.bgDark },
        cardStyle: {
          backgroundColor: colors.bgLight,
        },
      }}
    >
      <Stack.Screen
        name="patrocinio"
        component={proyectos_Patrocinados}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
