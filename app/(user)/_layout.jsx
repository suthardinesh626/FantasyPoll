import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

const RootLayout = () => {
    return (
        <Stack>
            
            <Stack.Screen name="singin" options={{ headerShown: false }} />   
            <Stack.Screen name="singup" options={{ headerShown: false }} />

        </Stack>
        
    );
}

export default RootLayout;
