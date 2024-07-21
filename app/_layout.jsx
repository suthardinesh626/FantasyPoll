import { Stack } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="(user)" options={{ headerShown: false }} />   
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />   
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    );
}

export default RootLayout;
