import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';

export default function StatusBarCuston(props) {
    const { backgroundColor, ...rest } = props;
    return (
        <>
            <StatusBar backgroundColor={"#79B4B7"} {...rest} />
            <SafeAreaView
                style={{
                    flex: 0,
                    backgroundColor: backgroundColor,
                }}
            />
        </>
    );
}
