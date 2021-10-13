//import { styleSheets, title } from 'min-document';
import React from 'react'
import { StyleSheet ,View, Text, Alert } from 'react-native';
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { map } from "lodash";
import { deleteAddressApi } from "../../api/address";
import colors from "../../styles/colors";
import useAuth from "../../hooks/useAuth";

export default function AddressList(props) {
    const { addresses, setReloadAddress } = props;
    const {auth } = useAuth();
    const navigation = useNavigation();

    const deleteAddressAlert = (address) =>{
        Alert.alert(
            "eliminando direccion",
            `Confirme para eliminar la direccion ${address.title} `,
            [
                {
                    text: "No"
                },
                {
                    text: "Si",
                    onPress: () => deleteAddress(address._id),
                }
               
            ],
            { Cancelable: false }
        );
    };

    const deleteAddress = async (idAddress) =>{
        try {
            await deleteAddressApi( auth, idAddress );
            setReloadAddress(true);
        } catch (error) {
            console.log(error);
        }
    };
    //console.log(addresses);

    const goToUpdateAddress =(idAddress) => {
        navigation.navigate("add-addresses", {idAddress});
    }

    return (
        <View style={ styles.container }> 
            {map(addresses, (address)=>(
               // <Text key={address._id}>hola</Text>
               <View key={address._id} style={styles.address}>
                   <Text style= { styles.title }> { address.title } </Text>
                   <Text> { address.name_lastname } </Text>
                   <Text> { address.address } </Text>
                   <View style={ styles.blockLine }>
                        <Text> {address.state} </Text>
                        <Text> {address.city} </Text>
                        <Text> {address.postal_code} </Text>
                   </View>
                   <Text> Procedencia: { address.country } </Text>
                   <Text> Telefono :{ address.phone } </Text>
                    <View style={styles.actions}>
                       <Button mode="contained" color= {colors.primary} onPress= {() => goToUpdateAddress(address._id)} >EDIT</Button> 
                       <Button mode="contained" color={ colors.primary} onPress={ () =>deleteAddressAlert(address) }>DELETE</Button>  
                    </View>

               </View>
            ))}
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        marginTop: 50,
    },
    address:{
        borderWidth: 0.9,
        borderRadius: 5,
        borderColor:"#ddd",
        paddingHorizontal: 15,
        paddingVertical:15,
        marginBottom: 15,
    },
    title: {
        fontWeight: "bold",
        paddingBottom: 5,

    },
    blockLine:{
        flexDirection: "row",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
    },
})
