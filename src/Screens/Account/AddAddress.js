import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { formStyles } from '../../styles';
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { addAddressApi, getAddressApi, updateAddressApi} from "../../api/address";
import useAuth from "../../hooks/useAuth";


export default function AddAddress(props) {
   // console.log(props);
   const { route: {params} } = props;
    const [loading, setLoading] = useState(false);
    const [newAddress, setNewAddress] = useState(true);
    const { auth } = useAuth();
    const navigation = useNavigation();
    //console.log(params);

    useEffect(() => {
       (async () =>{
        if(params?.idAddress){
            setNewAddress(false);
            navigation.setOptions({ title: "Actualizar Dirección"})
            const response = await getAddressApi(auth, params.idAddress);
            //console.log(response);  
            await formik.setFieldValue("_id", response._id); 
            await formik.setFieldValue("title", response.title); 
            await formik.setFieldValue("name_lastname", response.name_lastname); 
            await formik.setFieldValue("address", response.address);
            await formik.setFieldValue("postal_code", response.postal_code); 
            await formik.setFieldValue("city", response.city); 
            await formik.setFieldValue("state", response.state); 
            await formik.setFieldValue("country", response.country); 
            await formik.setFieldValue("phone", response.phone); 
        }
       } )()
    }, [ params ]);


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
        setLoading(true);
  
            try {
                if(newAddress) await addAddressApi(auth, formData);
                else await updateAddressApi(auth, formData);
               // console.log(respose);
                navigation.goBack();
            } catch (error) {
                /*Toast.show(error, {
                    position: Toast.positions.CENTER,
                });
                formik.setFieldError("email", true);*/
                console.log(error);
                setLoading(false);

            } 
        },
    });


    return (
        <KeyboardAwareScrollView extraScrollHeight = {25}>
            <View style={styles.container}>
                <Text style={styles.title}>agregar direcciones</Text>
                <TextInput label="Titulo..." style={formStyles.input} 
                onChangeText={(text)=> formik.setFieldValue("title", text)}
                value={formik.values.title}
                error={formik.errors.title}
             />
                <TextInput label="Nombre-Apellidos..." style={formStyles.input}
                onChangeText={(text)=> formik.setFieldValue("name_lastname", text)}
                value={formik.values.name_lastname}
                error={formik.errors.name_lastname}
                />
                <TextInput label="Direccion..." style={formStyles.input} 
                onChangeText={(text)=> formik.setFieldValue("address", text)}
                value={formik.values.address}
                error={formik.errors.address}
                 />
                <TextInput label="Codigo P..." style={formStyles.input}
                 onChangeText={(text)=> formik.setFieldValue("postal_code", text)}
                 value={formik.values.postal_code}
                 error={formik.errors.postal_code}
                  />
                <TextInput label="Poblacion..." style={formStyles.input}
                 onChangeText={(text)=> formik.setFieldValue("city", text)}
                 value={formik.values.city}
                 error={formik.errors.city}
                  />
                <TextInput label="Estado..." style={formStyles.input}
                 onChangeText={(text)=> formik.setFieldValue("state", text)}
                 value={formik.values.state}
                 error={formik.errors.state}
                  />
                <TextInput label="Paiss..." style={formStyles.input} 
                 onChangeText={(text)=> formik.setFieldValue("country", text)}
                 value={formik.values.country}
                 error={formik.errors.country}
                 />
                <TextInput label="Telefono..." style={formStyles.input} 
                 onChangeText={(text)=> formik.setFieldValue("phone", text)}
                 value={formik.values.phone}
                 error={formik.errors.phone}
                 />
                <Button mode="contained" style={[formStyles.btnSucces, styles.btnSucces]}
                onPress={formik.handleSubmit}
                loading={loading}
                >
                {newAddress ? "Crear": "Actualizar"}
                </Button>
            </View>
        </KeyboardAwareScrollView>
    );
}

function initialValues(){
    return {
        title: "",
        name_lastname: "",
        address: "",
        postal_code: "",
        city: "",
        state: "",
        country: "",
        phone: "",
    };
}

function validationSchema(){
    return{
        title: Yup.string().required(),
        name_lastname: Yup.string().required(),
        address: Yup.string().required(),
        postal_code: Yup.string().required(),
        city: Yup.string().required(),
        state: Yup.string().required(),
        country: Yup.string().required(),
        phone: Yup.string().required().max(10),
    }
}


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        paddingVertical: 20,
    },
    btnSucces:{
        marginBottom: 20,
    },
});