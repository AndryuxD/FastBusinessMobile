import React, { useState, useCallback } from "react";
import { ScrollView, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import StatusBar from "../../Components/Search/StatusBar";

import Search from "../../Components/Search";
import ScreenLoading from "../../Components/Search/ScreenLoading";
import UserInfo from "../../Components/Account/UserInfo";
import Menu from "../../Components/Account/Menu";
//import { getMeApi } from "../../api/user";
import { getMeApi } from "../../api/user";

import useAuth from "../../hooks/useAuth";
import colors from "../../styles/colors";



export default function Account() {
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
                <>
                    <Search />
                    <ScrollView>
                       {/*<UserInfo user={user} />*/} 
                        <Menu />
                    </ScrollView>
                </>
            )}
        </>
    );
}
