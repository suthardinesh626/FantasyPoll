import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native';

const RootLayout = () => {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className=" text-2xl font-bold " >
                THis is the home
            </Text>
        </View>
    );
}

export default RootLayout;
