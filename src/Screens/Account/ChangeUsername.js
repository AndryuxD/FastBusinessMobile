import React, { useState, useCallback } from 'react';
import { TextInput, Button } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-root-toast";
import useAuth from "../../hooks/useAuth";
import { getMeApi, updateUserApi } from "../../api/user";
import { formStyles } from "../../styles";
import { StyleSheet, View } from 'react-native';

export default function ChangeUserName() {
    const {auth} = useAuth ();
    const [ loading, setLoading] = useState(false);
    const navigation = useNavigation();
    //console.log(auth);
    useFocusEffect(
    useCallback(() => {
        //console.log("Hola")
        (async () =>{
            const response = await getMeApi(auth.token);
            //console.log(respose.username);
            await formik.setFieldValue("username", response.username);
        })();
    }, [])
    );

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (FormData) => {
            setLoading(true);
            //console.log("formulario enviado");
            //console.log(formData);

            try {

                const response = await updateUserApi(auth, FormData);
                if(response.statusCode) throw "el nombre de usuario ya existe";
                //console.log("todo bien");
                navigation.goBack();
                
            } catch (error) {
                Toast.show(error, {
                    position: Toast.positions.CENTER
                })
                formik.setFieldError("username", true);


            }
            
            setLoading(false);
        }
    });
   

    return (
        <View style={styles.content}>
            <TextInput label="Nombre del Usuario : "
            style={formStyles.input}
            onChangeText={(text) => formik.setFieldValue("username", text)}
            value={formik.values.username}
            error={formik.errors.username}
            />

            <Button mode = "contained" 
            style={ formStyles.btnSucces}
            onPress={formik.handleSubmit}
            loading = {loading}
            >Change Username</Button>
        </View>
    );

}



function initialValues(){
    return {
        username: "",
    };
}

function validationSchema(){
    return{
        username: Yup.string().min(4, true).required(true),
    };
}

const styles = StyleSheet.create({
    content: {
        padding: 20,

    }
});