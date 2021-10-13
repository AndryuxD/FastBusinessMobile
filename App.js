import React, { useState, useMemo, useEffect } from "react";
import { Text, View, Button } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import AppNavigation from "./src/Navigation/AppNavigation";
import AppNavigationInv from "./src/Navigation/AppNavigationInv";
import AuthScreen from "./src/Screens/Auth";
import AuthContext from "./src/context/AuthContext";
import { setTokenApi, getTokenApi, removeTokenApi } from "./src/api/token";
import jwtDecode from "jwt-decode";
import { getMeApi } from "./src/api/user";

export default function App() {
  const [auth, setAuth] = useState(undefined);
  const [userxd, setUser] = useState("");

  useEffect(() => {
    (async () => {
      setUser(null);
      const token = await getTokenApi();
      const response = await getMeApi(token);
      if (token) {
        setAuth({
          token,
          idUser: jwtDecode(token).id,
          tipousuario: response.tipousuario,
        });
        setUser(response.tipousuario);
      } else {
        setAuth(null);
      }
    })();
  }, []);

  const login = (user) => {
    setTokenApi(user.jwt);
    setUser(user.user.tipousuario);
    try {
      setAuth({
        token: user.jwt,
        idUser: user.user._id,
        tipousuario: user.user.tipousuario,
      });
    } catch (error) {
      console.log(error);
      console.log("error");
    }
  };

  const logout = () => {
    if (auth) {
      removeTokenApi();
      setAuth(null);
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
    }),
    [auth]
  );

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <PaperProvider>
        {auth ? (
          userxd === "emprendedor" ? (
            <AppNavigation />
          ) : (
            <AppNavigationInv />
          )
        ) : (
          <AuthScreen />
        )}
      </PaperProvider>
    </AuthContext.Provider>
  );
}
