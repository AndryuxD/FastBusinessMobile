import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";
import useAuth from "../../hooks/useAuth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUserApi } from "../../api/user";
import { formStyles } from "../../styles";

export default function ChangePassword() {

    const {auth} = useAuth ();
    //const {auth, logout } = useAuth (); --> sirve para pasar el parametro de deslogeo
    const [ loading, setLoading] = useState(false);
    const navigation = useNavigation();
    //console.log(auth);
    /*useFocusEffect(
    useCallback(() => {
        //console.log("Hola")
        (async () =>{
            const response = await getMeApi(auth.token);
            //console.log(respose.username);
            await formik.setFieldValue("username", response.username);
        })();
    }, [])
    );*/


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
       onSubmit: async (FormData) => {

            setLoading(true);

            try {

               const response = await updateUserApi(auth, FormData);
                if(response.statusCode) throw "algo a salido mal en cambio de contraseña";
                //console.log("todo bien");
                navigation.goBack();
                //logout(); ->sirve para deslogear despues de cambiar la contraseña
                
            } catch (error) {
                Toast.show(error, {
                    position: Toast.positions.CENTER
                })
              //  formik.setFieldError("", true);

              setLoading(false);
            } 
        },
    });

    return (
        <View style={styles.content}>
            <TextInput label="Nueva contraseña"
            style={formStyles.input}
            onChangeText={(text) => formik.setFieldValue("password", text)}
            value={formik.values.password}
            error={formik.errors.password}
            secureTextEntry
            />

            <TextInput label="Repetir Contraseña..."
            style={formStyles.input}
            onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
            value={formik.values.repeatPassword}
            error={formik.errors.repeatPassword}
            secureTextEntry
            />

            <Button mode = "contained" 
            style={ formStyles.btnSucces}
           
            onPress={formik.handleSubmit}
            loading = {loading}
            >Change Password</Button>
        </View>
    )
}


function initialValues(){
    return {
        password: "",
        repeatPassword:"",
    };
}

function validationSchema(){
    return{
        password: Yup.string().min(4, true).required(true),
        repeatPassword: Yup.string().min(4, true).required(true).oneOf([Yup.ref("password")], true).required(true),

    };
}


const styles = StyleSheet.create({
    content: {
        padding: 20,
    }
});