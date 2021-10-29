import React from "react";
import { Alert } from "react-native";
import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";

export default function Menu() {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const logoutAccount = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Seguro que deseas cerrar sesión?",
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: logout,
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <List.Section>
        <List.Subheader>Mi Cuenta</List.Subheader>
        <List.Item
          title="Editar informacion personal"
          description="Cambia tus datos personales"
          left={(props) => <List.Icon {...props} icon="face" />}
          onPress={() => navigation.navigate("change-personal-info")}
        />
        <List.Item
          title="Cambiar Contraseña  "
          description="Cambiar la contraseña de tu cuenta"
          left={(props) => <List.Icon {...props} icon="key" />}
          onPress={() => navigation.navigate("change-password")}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>Aplicación</List.Subheader>
        <List.Item
          title="Ayuda"
          description="Preguntas Frecuentes"
          left={(props) => <List.Icon {...props} icon="clipboard-list" />}
          onPress={() => navigation.navigate("apps")}
        />
        <List.Item
          title="Preguntas"
          description="aqui puedes ver el historial de las preguntas echas"
          left={(props) => <List.Icon {...props} icon="account-question" />}
          onPress={() => navigation.navigate("preguntas")}
        />

        <List.Item
          title="Cerrar sesión"
          description="Cierra esta sesión e inicia con otra"
          left={(props) => <List.Icon {...props} icon="logout" />}
          onPress={logoutAccount}
        />
      </List.Section>
    </>
  );
}
/*

<List.Item
title="Cambiar Email"
description="Cambia el email de tu cuenta"
left={(props) => <List.Icon {...props} icon="at" />}
onPress={() => navigation.navigate("change-email")}
/>
<List.Item
title="Cambiar el username"
description="Cambia el nombre de usuario de tu cuenta"
left={(props) => <List.Icon {...props} icon="sim" />}
onPress={() => navigation.navigate("change-username")}
/>*/
