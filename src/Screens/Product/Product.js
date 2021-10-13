import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import colors from "../../styles/colors";
import { getProductApi } from "../../api/product";
import { Button } from "react-native-paper";
import {CarouselImages, StatusBar, Search, ScreenLoading} from '../../Components/index';
//import StatusBar from "../../Components/Search/StatusBar";
//import Search from "../../Components/Search"
//import CarouselImages from "../../Components/Product/CarouselImages";
//import ScreenLoading from "../../Components/Search/ScreenLoading";


export default function product(props) {

    const { route } = props;
    const { params } = route;
    //console.log(params);

    const [productos, setProductos] = useState(null);
    const [imagenes, setImagenes] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await getProductApi(params.idProductos);
            setProductos(response);
            const arregloimg = [response.imagen];
            arregloimg.push(...response.imagenes);
            setImagenes(arregloimg);
        })();
    }, [params]);

    return (
        <>
            <StatusBar backgroundColor={colors.bgDark} barstyle="light-content" />
            <Search />
            {!productos ? (
                <ScreenLoading  text="Cargando la informacion del proyecto..." size="large" />
            ) : (
                <ScrollView style={styles.container}>
                    <Button style={styles.btnuwu}>Salir</Button>
                    <Button mode="contained" style={styles.titles}> Nombre del Proyeto: </Button>
                    <Text style={styles.titleDes}> {productos.nombre} </Text>
                    <Button mode="contained" style={styles.titles}>Nombre del emprendedor: </Button>
                    <Text style={styles.titleDes}>{productos.emprendedor}</Text>
                    <Button mode="contained" style={styles.titles}>Tipo de empresa:</Button>
                    <Text style={styles.titleDes}>{productos.empresa}</Text>
                    <View>
                        <CarouselImages  imagenes={imagenes} />
                    </View>
                    <Button mode="contained" style={styles.titles}>Descripcion del Proyecto:</Button>
                    <Text style={styles.titleDes}>{productos.descripcion}</Text>
                    <Button mode="contained" style={styles.btn} >Estado: {productos.estado}</Button>
                </ScrollView>
            )}
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        paddingBottom: 50,
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 8,
        padding: 25,
        alignItems:"flex-start",
    },
    titleDes: {
        fontSize: 15,
        marginBottom: 2,
        padding: 15,
        backgroundColor: "#DCDCDC",
        maxWidth: 400,
        maxHeight: "200%",
        borderRadius: 5,
        textAlign: "center",
       // GrayText:"blue",
    },
    containervista: {
        padding: 10,
    },
    titles:{
        fontWeight: "bold",
        fontSize: 12,
        marginBottom: 3,
        padding: 10,
        //alignItems:"flex-start",
        backgroundColor: "#2B53C1",
    },
    btn:{
        marginBottom: 12,
        padding: 15,
        padding: 8,
        backgroundColor: "#2B53C1",
    },
    btnuwu:{
        alignItems:"flex-end"
    },
    imagenesC:{
        marginBottom: 2,
        padding:5,
        
    },
});
