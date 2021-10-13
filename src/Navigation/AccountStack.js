import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChangeUsername from "../Screens/Account/ChangeUsername";
import AddAddresses from "../Screens/Account/AddAddress";
import preguntas from "../Screens/Account/preguntas";
import App from "../Components/chat/App";

import {
  Account,
  ChangeName,
  ChangeEmail,
  ChangePassword,
  Addresses,
} from "../Screens";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode="screen"
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#16222b" },
      }}
    >
      <Stack.Screen
        name="account"
        component={Account}
        options={{ title: "cuenta", headerShown: false }}
      />
      <Stack.Screen
        name="change-name"
        component={ChangeName}
        options={{
          title: "Cambiar nombre y Apellidos",
        }}
      />
      <Stack.Screen
        name="change-email"
        component={ChangeEmail}
        options={{
          title: "Cambiar el email",
        }}
      />
      <Stack.Screen
        name="change-username"
        component={ChangeUsername}
        options={{
          title: "Cambiar el User name",
        }}
      />
      <Stack.Screen
        name="change-password"
        component={ChangePassword}
        options={{
          title: "Cambiar el User contraseña",
        }}
      />
      <Stack.Screen
        name="addresses"
        component={Addresses}
        options={{
          title: "Mis Direcciones..",
        }}
      />
      <Stack.Screen
        name="add-addresses"
        component={AddAddresses}
        options={{
          title: "Nueva direccion..",
        }}
      />
      <Stack.Screen
        name="apps"
        component={App}
        options={{
          title: "preguntas frecuentes..",
        }}
      />
      <Stack.Screen
        name="preguntas"
        component={preguntas}
        options={{
          title: "Preguntas",
        }}
      />
    </Stack.Navigator>
  );
}
