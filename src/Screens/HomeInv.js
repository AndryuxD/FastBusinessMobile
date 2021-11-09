import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import StatusBar from "../Components/Search/StatusBar";
import Search from "../Components/Search/Search";
import ScreenLoading from "../Components/Search/ScreenLoading";
import { getMeApi } from "../api/user";
import useAuth from "../hooks/useAuth";
import colors from "../styles/colors";

export default function HomeInv() {
  const [user, setUser] = useState(null);
  const { auth } = useAuth();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        setUser(null);
        const response = await getMeApi(auth.token);
        setUser(response);
      })();
    }, [])
  );

  return (
    <>
      <StatusBar backgroundColor={colors.bgDark} barStyle="light-content" />
      {!user ? (
        <ScreenLoading size="large" />
      ) : (
        <View>
          <Search/>
          <View style={styles.container}>
           
          <View style={styles.row}>
         
            <Text style={styles.tittle}>Bienvenido, Inversionista </Text>
            <Text style={styles.tittleName}>
              {user.name && user.lastname
                ? `${user.name} ${user.lastname}`
                : user.email}
            </Text>
          </View>
        </View>

        </View>
        
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: "center",
    padding: 20,
  },
  tittle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tittleName: {
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
  },
});
