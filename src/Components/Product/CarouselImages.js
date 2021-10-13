import React, { useState } from 'react'
import { StyleSheet, Dimensions, Image } from 'react-native';
import Carousel, { Pagination } from "react-native-snap-carousel";
import { API_URL } from "../../utils/Constants";
import { size } from "lodash";

const width = Dimensions.get("window").width;
const height = 500;

export default function CarouselImages(props) {
    const { imagenes } = props;
    //console.log(images);
    const [imageActive, setImageActive] = useState(0);

    const renderItem = ({ item }) => {
        console.log(item);
        return <Image style={styles.carousel} source={{ uri: `${API_URL}${item.url}` }} />;
        
    }

    return (
        <>
            <Carousel
                layout={"default"}
                data={imagenes}
                sliderWidth={width}
                itemWidth={width}
                renderItem={renderItem}
                onSnapToItem={(index) => setImageActive(index)}
            />
            <Pagination
                dotsLength={size(imagenes)}
                activeDotIndex={imageActive}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}

            />
        </>
    );
}

const styles = StyleSheet.create({
    carousel: {
        width,
        height,
        resizeMode: "contain",
    },
})
